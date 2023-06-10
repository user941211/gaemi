const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cheerio = require("cheerio");
const app = express();
const port = 3001;
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

db1_name = 'daily_craw'
db2_name = 'daily_buy_list'
db3_name = 'stock_finance'
db4_name = 'processed_stock_data'

const db1 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: db1_name
});
const db2 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: db2_name
});
const db3 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: db3_name
});
const db4 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: db4_name
});

db1.connect((error) => {
  if (error) {
    console.error("Error connecting to DB 1:", error);
    return;
  }
  console.log("DB 1 연결성공");
});
db2.connect((error) => {
  if (error) {
    console.error("Error connecting to DB 2:", error);
    return;
  }
  console.log("DB 2 연결성공");
});
db3.connect((error) => {
  if (error) {
    console.error("Error connecting to DB 3:", error);
    return;
  }
  console.log("DB 3 연결성공");
});

db4.connect((error) => {
  if (error) {
    console.error("Error connecting to DB 5:", error);
    return;
  }
  console.log("DB 4 연결성공");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let inputValue;

app.use(express.urlencoded({ extended: true }));
app.post("/search", (req, res) => {
  inputValue = req.body.name;
  console.log("Received search term:", inputValue);
  res.header("Access-Control-Allow-Origin", "*");
  db2.query(
    `SELECT * FROM ${db2_name}.stock_item_all WHERE code = ? OR code_name = ?`,
    [inputValue, inputValue],
    (error, db1results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (db1results.length === 0) {
        return res.json({ message: "해당하는 종목이 없습니다." });
      }
      console.log("db1 결과 : ", db1results);
      const jkValue = db1results[0].code_name.replace(/'/g, "");
      console.log(jkValue);

      db1.query(
        `SELECT code, code_name, date, close, d1_diff_rate FROM ${jkValue} where date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)`,
        (error, chartdata) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          if (chartdata.length === 0) {
            return res.json({ message: "table don't find" });
          }
          console.log(chartdata);

          db3.query(
            `select IFRS, \`2020/12\`, \`2021/12\`, \`2022/12\`, \`2023/12(E)\` from ${jkValue};`,
            (error, finance) => {
              if (error) {
                console.error(error);
                return res.status(500).json({ error: "Internal Server Error" });
              }
              if (finance.length === 0) {
                return res.json({ message: "table don't find" });
              }
              console.log(finance);

              db4.query(
                `SELECT 종목명, 거래대금 FROM ${db4_name}.RAW_Data ORDER BY 거래대금 DESC LIMIT 3;`,
                (error, recommend) => {
                  if (error) {
                    console.error(error);
                    return res
                      .status(500)
                      .json({ error: "Internal Server Error" });
                  }
                  if (recommend.length === 0) {
                    return res.json({ message: "table don't find" });
                  }
                  console.log(recommend);

                  db4.query(
                    `SELECT 종목명, 업종, 종가, 거래대금, S_RIM, S_RIM_20, S_RIM_difr, S_RIM_10 FROM ${db4_name}.S_RIM_ALL_DATA;`,
                    (error, rim) => {
                      if (error) {
                        console.error(error);
                        return res
                          .status(500)
                          .json({ error: "Internal Server Error" });
                      }
                      if (rim.length === 0) {
                        return res.json({ message: "table don't find" });
                      }
                      console.log(rim);

                      const responseData = {
                        results: chartdata,
                        finance: finance,
                        recommend: recommend,
                        rim: rim,
                      };

                      res.json(responseData);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
