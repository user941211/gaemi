const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3001;

// sql 연동
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "941211",
  database: "tistory",
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
/*app.get('/test', (req, res) => {
  const query = 'SELECT * FROM test';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    db.query(query,
      (err, result) => {
          if (err)
              console.log(err);
          else
              res.send(result);
    });

    res.json(results);
  });
});*/
app.get("/test", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const sql = "SELECT * FROM test;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
