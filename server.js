const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3001;

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
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
// 잘 연동 되었는지 확인
db1.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("db1 성공");
});
db2.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("db2 성공");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get("/search", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const sql = "SELECT * FROM AJ네트웍스;";
  db1.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));
app.post('/search', (req, res) => {
  const inputValue = req.body.inputValue;

  // Search for the value in the `hi` and `jk` columns of the `def` table in the `abc` database
  db2.query(
    `SELECT * FROM ${process.env.REACT_APP_DB_DATABASE2}.daily_buy_list WHERE code = ? OR code_name = ?`,
    [inputValue, inputValue],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length === 0) {
        // If the value doesn't exist, respond with "don't find"
        return res.json({ message: "don't find" });
      }

      const jkValue = results[0].jk;

      // Search for a table with the same value and name in the `xyz` database
      db1.query(
        `SELECT * FROM information_schema.tables WHERE table_schema = ${process.env.REACT_APP_DB_DATABASE1} AND table_name = ?`,
        [jkValue],
        (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          if (results.length === 0) {
            // If the table doesn't exist, respond with "table don't find"
            return res.json({ message: "table don't find" });
          }

          const tableName = results[0].table_name;

          // Perform the SELECT * FROM query on the found table
          db2.query(`SELECT * FROM ${process.env.REACT_APP_DB_DATABASE2}.${tableName}`, (error, results) => {
            if (error) {
              console.error(error);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Respond with the result of the SELECT * FROM query
            res.json(results);
          });
        }
      );
    }
  );
});