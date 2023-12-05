const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');
var router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const sessions = {};
let sId;
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
  { name: "predict", connection: null }, // DB 4
  { name: "user", connection: null }, // DB 5
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
      `SELECT code, code_name, date, close, open, high, low, volume FROM ${jkValue} WHERE date >= DATE_SUB('2023-11-10', INTERVAL 10 MONTH)`
    );
    const chartdata2 = await queryDatabase(
      databases[4].connection,//predict db
      `SELECT date, predict_close FROM ${jkValue} WHERE date >= DATE_SUB('2023-12-31', INTERVAL 2 MONTH)`
    );
    if (chartdata.length === 0) {
      return res.json({
        message: "table don't find 1, OR db is not up to date 10 months",
      });
    }
    if (chartdata2.length === 0) {
      return res.json({
        message: "table2 don't find 1, OR db is not up to date 2 months",
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
      results2: chartdata2,
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
    SELECT 종목명,종가,시가총액, 거래량,거래대금,BPS,PER,PBR,EPS
    FROM RAW_Data
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
      case "transactionVolume":
        translatedCategory = "거래대금";
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



app.post("/Login", async (req, res) => {
  const loginResult = await queryDatabase(
    databases[5].connection,
    `SELECT *
    FROM ${databases[5].name}.userInfo
    WHERE id=${req.body.id} AND password=${req.body.password}`,
    []
  );

  const result = loginResult[0];

  if (result) {
    req.session.userId = result.userId;
    sId = req.sessionID;
    await req.session.save();
    sessions[sId] = req.session;
    res.json({ success: true, userId: result.userId, message: '로그인 성공' });
  } else {
    res.json({ success: false, message: '로그인 실패' });
  }
});


app.get('/checkLogin', (req, res) => {

  // 세션 데이터 읽기
  const sessionData = sessions[sId];

  if (sessionData && sessionData.userId) {
    // 로그인 중인 경우
    const userId = sessionData.userId;
    res.json({ isLoggedIn: true, userId });
  } else {
    // 로그인하지 않은 경우
    res.json({ isLoggedIn: false, message: '사용자 정보를 찾을 수 없습니다.' });
  }
});

app.post("/logout", (req, res) => {
  const sessionId = req.sessionID;

  // 세션 제거
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ success: false, message: "Error logging out" });
    } else {
      // 클라이언트로 세션 제거 완료 응답 보내기
      res.json({ success: true, message: "Logout successful" });

      // 서버 측에서도 세션 정보 삭제
      delete sessions[sessionId];
    }
  });
});

app.post("/mypage", async (req, res) => {
  const sessionData = sessions[sId];
  if (sessionData && sessionData.userId) {
    const Id = sessionData.userId;

    try {
      const mypageResult = await queryDatabase(
        databases[5].connection,
        `SELECT point, jusic, jusicPrice
        FROM ${databases[5].name}.userInfo
        WHERE userId=${Id}`,
        []
      );

      // mypageResult에서 데이터를 읽어와 변수에 할당
      const { point, jusic, jusicPrice } = mypageResult[0];
      let nowPrice = null;

      if (jusic) {
        const nowpriceget = await queryDatabase(
          databases[3].connection,
          `SELECT 종가
          FROM ${databases[3].name}.RAW_Data
          WHERE 종목명='${jusic}'`,
          []
        );

        // nowpriceget[0]가 객체인 경우 nowpriceget[0].종가를 추출
        // 그렇지 않은 경우 null로 설정
        nowPrice = nowpriceget[0]?.종가 || null;
      }

      res.json({ userId: Id, point, jusic, jusicPrice, nowPrice });
    } catch (error) {
      console.error("Error fetching mypage data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});


app.post("/mypageClosing", async (req, res) => {
  const { userId, updatedPoint } = req.body;

  await queryDatabase(
    databases[5].connection,
    `UPDATE ${databases[5].name}.userInfo
    SET point=${updatedPoint}
    WHERE userId=${userId}`,
    []
  );

  await queryDatabase(
    databases[5].connection,
    `UPDATE ${databases[5].name}.userInfo
    SET jusic=NULL, jusicPrice=NULL
    WHERE userId=${userId}`,
    []
  );

  res.json({ success: true, message: "결산이 완료되었습니다." });
});

app.post("/startJusic", async (req, res) => {
  const { textBoxValue, userId } = req.body;

  const result = await queryDatabase(
    databases[3].connection,  // 여기서는 [3]으로 수정
    `SELECT 종가 
    FROM ${databases[3].name}.RAW_Data
    WHERE 종목명='${textBoxValue}'`,  // 여기서는 '종목명'으로 수정
    []
  );

  if (result.length > 0) {  // result가 배열이므로 length로 확인
    const price = result[0]?.종가 || null;
    await queryDatabase(
      databases[5].connection,
      `UPDATE ${databases[5].name}.userInfo
      SET jusic='${textBoxValue}', jusicPrice=${price}
      WHERE userId=${userId}`,
      []
    );

    res.json({ success: true, message: "모의투자가 시작되었습니다." });
  } else {
    res.json({ success: false, message: "주식 명을 확인해주세요" });
  }
});

app.post("/checkDuplicate", async (req, res) => {
  const { id } = req.body;

  try {
    // 입력받은 아이디로 중복 확인 쿼리 수행
    const checkDuplicateResult = await queryDatabase(
      databases[5].connection,
      `SELECT * FROM ${databases[5].name}.userInfo WHERE id='${id}'`
    );

    const isDuplicate = checkDuplicateResult.length > 0;

    // 중복 여부를 JSON 형태로 응답
    res.json({ isDuplicate });
  } catch (error) {
    console.error("Error checking duplicate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { id, password } = req.body;
      await queryDatabase(
        databases[5].connection,
        `INSERT INTO ${databases[5].name}.userInfo (id, password)
         VALUES ('${id}', '${password}')`,
        []
      );
      res.json({ success: true, message: '회원가입이 완료되었습니다.' });
    
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
