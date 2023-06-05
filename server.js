const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cheerio = require('cheerio');
const app = express();
const port = 3001;
require('dotenv').config();
const bodyParser = require('body-parser');
//import Stock from './src/components/stock'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// sql 연동
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
// 잘 연동 되었는지 확인
db1.connect((error) => {
  if (error) { console.error("Error connecting to MySQL1:", error); return; }
  console.log("db1 성공");
});
db2.connect((error) => {
  if (error) { console.error("Error connecting to MySQL2:", error); return; }
  console.log("db2 성공");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let inputValue;
// post 요청 시 값을 객체로 바꿔줌
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
        return res.json({ message: "못 찾겠다.." });
      }
      console.log('db1 결과 : ',db1results);
      const jkValue = db1results[0].code_name.replace(/'/g, ''); // 수정: 구문 오류 수정
      console.log(jkValue);

      /*const url = `https://alphasquare.co.kr/home/stock/stock-summary?code=${inputValue}`;
      axios.get(url)
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html);

          // 크롤링 코드 작성 예시
          const targetElements = $('.contents, .clickable-layer v-popper--has-tooltip');
          const texts = targetElements.map((index, element) => {
            return $(element).text();
          }).get();

          Stock.processData(texts, inputValue); // stock.js로 데이터 전달
        })
        .catch(error => {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        });*/
      db1.query(
        `SELECT date, close, open, volume, code, high, low FROM ${jkValue} where date>= DATE_SUB(NOW(), INTERVAL 3 MONTH)`,
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          if (results.length === 0) {
            return res.json({ message: "table don't find" });
          }
          console.log(results);
          res.json(results);
          const tableName = results[0].code_name;
        }
      );
    }
  );
});