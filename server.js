const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cheerio = require('cheerio');
const app = express();
const port = 3001;
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const db1 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_DATABASE1,
});
const db2 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_DATABASE2,
});
const db3 = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_DATABASE3,
});

db1.connect((error) => {
  if (error) { console.error("Error connecting to MySQL1:", error); return; }
  console.log("db1 성공");
});
db2.connect((error) => {
  if (error) { console.error("Error connecting to MySQL2:", error); return; }
  console.log("db2 성공");
});
db3.connect((error) => {
  if (error) { console.error("Error connecting to MySQL2:", error); return; }
  console.log("db3 성공");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let inputValue;

app.use(express.urlencoded({ extended: true }));
app.post('/search', (req, res) => {
  inputValue = req.body.name;
  console.log('Received search term:', inputValue);
  res.header('Access-Control-Allow-Origin', '*');
  db2.query(
    `SELECT * FROM ${process.env.REACT_APP_DB_DATABASE2}.stock_item_all WHERE code = ? OR code_name = ?`,
    [inputValue, inputValue],
    (error, db1results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (db1results.length === 0) {
        return res.json({ message: "해당하는 종목이 없습니다." });
      }
      console.log('db1 결과 : ', db1results);
      const jkValue = db1results[0].code_name.replace(/'/g, '');
      console.log(jkValue);

      db1.query(
        `SELECT date, close, open, volume, code, code_name, high, low FROM ${jkValue} where date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)`,
        (error, chartdata) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
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
                return res.status(500).json({ error: 'Internal Server Error' });
              }
              if (finance.length === 0) {
                return res.json({ message: "table don't find" });
              }
              console.log(finance);

              const responseData = {
                results: chartdata,
                finance: finance
              };

              res.json(responseData);
            }
          );
        }
      );
    }
  );
});
