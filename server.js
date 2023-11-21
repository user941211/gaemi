const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

require("dotenv").config();

app.use(cors());

const dbConfig = {
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
};

const databases = [
  { name: "daily_craw", connection: null }, // DB 0
  { name: "daily_buy_list", connection: null }, // DB 1
  { name: "stock_finance", connection: null }, // DB 2
  { name: "processed_stock_data", connection: null }, // DB 3
];

const connectToDatabases = async () => {
  for (const database of databases) {
    database.connection = mysql.createConnection({
      ...dbConfig,
      database: database.name,
    });

    await new Promise((resolve, reject) => {
      database.connection.connect((error) => {
        if (error) {
          console.error(`Error connecting to ${database.name} DB:`, error);
          reject(error);
        } else {
          console.log(`${database.name} 연결성공`);
          resolve();
        }
      });
    });
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabases().catch((error) => {
  console.error("Failed to connect to databases:", error);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/search", async (req, res) => {
  const inputValue = req.body.name;
  console.log("Received search term:", inputValue);
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const db1Results = await queryDatabase(
      databases[1].connection,
      `SELECT * FROM ${databases[1].name}.stock_item_all WHERE code = ? OR code_name = ?`,
      [inputValue, inputValue]
    );

    if (db1Results.length === 0) {
      return res.json({ message: "해당하는 종목이 없습니다." });
    }

    console.log("daily_buy_list 내의 검색 결과 : ", db1Results);
    const jkValue = db1Results[0].code_name.replace(/'/g, ""); // ex: jkValue = 삼성전자
    console.log(jkValue); // EX: 005930 입력 시, jkValue = '삼성전자' 로 daily_craw 테이블에서 검색

    const chartdata = await queryDatabase(
      databases[0].connection,
      // 아래 구문은 최신 DB Date가 3개월 초과하면 오류
      // `SELECT code, code_name, date, close FROM ${jkValue} WHERE date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)`
      // 땜빵 해둠
      `SELECT code, code_name, date, close, open, high, low, volume FROM ${jkValue} WHERE date >= DATE_SUB('2023-11-10', INTERVAL 3 MONTH)`
    );

    if (chartdata.length === 0) {
      return res.json({
        message: "table don't find 1, OR db is not up to date 3 months",
      });
    }
    //console.log(chartdata);

    const finance = await queryDatabase(
      databases[2].connection,
      `SELECT IFRS, \`2020/12\`, \`2021/12\`, \`2022/12\`, \`2023/12(E)\` FROM ${jkValue}`
    );

    if (finance.length === 0) {
      return res.json({ message: "table don't find 2" });
    }
    //console.log(finance);

    const recommend = await queryDatabase(
      databases[3].connection,
      `SELECT 종목명, 거래대금 FROM ${databases[3].name}.RAW_Data ORDER BY 거래대금 DESC LIMIT 3`
    );

    if (recommend.length === 0) {
      return res.json({ message: "table don't find 3" });
    }
    //console.log(recommend);

    const rim = await queryDatabase(
      databases[3].connection,
      `SELECT 종목명, 업종, 종가, 거래대금, S_RIM, S_RIM_20, S_RIM_difr, S_RIM_10 FROM ${databases[3].name}.S_RIM_ALL_DATA`
    );

    if (rim.length === 0) {
      return res.json({ message: "table don't find 4" });
    }
    //console.log(rim);

    const responseData = {
      results: chartdata,
      finance: finance,
      recommend: recommend,
      rim: rim,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function queryDatabase(connection, sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: "processed_stock_data",
});

// 연결
connection.connect();

// API 엔드포인트
app.post("/filterData", (req, res) => {
  const filterValues = req.body;
  console.log(filterValues);

  // 동적으로 SQL 쿼리 생성
  let sqlQuery = `
    SELECT 종목명, 시가총액, 거래량,BPS,PER,PBR,EPS
    FROM ALL_DATA_저PBR_저PER
    WHERE 1 = 1
  `;

  // 각 필터 값들을 반영하여 SQL 쿼리에 추가
  for (const category in filterValues) {
    const minValue = filterValues[category].minValue;
    const maxValue = filterValues[category].maxValue;

    // 카테고리에 따라 필드 이름 변경
    let translatedCategory = category;
    switch (category) {
      case "marketCap":
        translatedCategory = "시가총액";
        break;
      case "stockPrice":
        translatedCategory = "종가";
        break;
      case "tradingVolume":
        translatedCategory = "거래량";
        break;
      case "BPS":
        translatedCategory = "BPS";
        break;
      case "PER":
        translatedCategory = "PER";
        break;
      case "PBR":
        translatedCategory = "PBR";
        break;
      case "EPS":
        translatedCategory = "EPS";
        break;
      // 필요한 경우 다른 카테고리를 추가하실 수 있습니다.

      default:
        break;
    }

    if (minValue !== "" && maxValue !== "") {
      sqlQuery += ` AND ${translatedCategory} > ${minValue} AND ${translatedCategory} < ${maxValue}`;
    }
  }

  // 쿼리 실행
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error("SQL 쿼리 실행 중 오류 발생:", error);
      res.status(500).json({ error: "내부 서버 오류" });
    } else {
      console.log("쿼리 결과:", results);
      res.status(200).json(results); // 결과를 JSON 형태로 클라이언트에게 반환
    }
  });
});



app.get('/api/companies', (req, res) => {
  const { category } = req.query;

  // 동적으로 SQL 쿼리 생성
  let sqlQuery = `
    SELECT 종목명,종가
    FROM processed_stock_data.RAW_Data
    WHERE 업종 LIKE '%${category}%'
  `;

  // 쿼리 실행
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error("SQL 쿼리 실행 중 오류 발생:", error);
      res.status(500).json({ error: "내부 서버 오류" });
    } else {
      console.log("쿼리 결과:", results);
      res.status(200).json(results); // 결과를 JSON 형태로 클라이언트에게 반환
    }
  });
});

app.post("/firstpage", async (req, res) => {
  console.log("Received firstpage data");
  try {
    const db1Results = await queryDatabase(
      databases[3].connection,
      `SELECT 종목명
      FROM ${databases[3].name}.RAW_Data
      ORDER BY 거래량 DESC
      LIMIT 10`,
      []
    );
    const db2Results = await queryDatabase(
      databases[3].connection,
      `SELECT 종목명
      FROM ${databases[3].name}.RAW_Data
      ORDER BY 종가 DESC
      LIMIT 10`,
      []
    );
    const db3Results = await queryDatabase(
      databases[3].connection,
      `SELECT 종목명
      FROM ${databases[3].name}.RAW_Data
      ORDER BY 시가총액 DESC
      LIMIT 10`,
      []
    );

     const responseData = {
      jongga: db1Results,
      trade: db2Results,
      complete: db3Results,
    };
    
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});