const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3001;
require('dotenv').config();
// sql 연동
const db = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.envREACT_APP_DB_USERNAME,
});
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// 잘 연동 되었는지 확인
db.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("Connected to MySQL database!");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));
// API Server 밑에거 지우고 주석 부분으로도 실행 가능
app.get("/AJ네트웍스", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const sql = "SELECT * FROM AJ네트웍스;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
