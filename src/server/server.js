const fs = require('fs');

const express =require('express');
const bodyParser = require('body-parser');
const app =express();
const port = process.env.port || 5000;

app.use(bodyParser.json());//기본적으로 REST API 에서는 데이터 주고받을때 json 데이터 형식으로 주고받음
app.use(bodyParser.urlencoded({extended:true}));


//디비연동 코드
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
    user: "root",
    password: require("./password.json").mysql.password,
    host: "127.0.0.1",
    port: 3306,
    database: "tistory",
});
connection.connect();



app.get('/api/customers', (req,res) => {
    //디비 접근하기
    connection.query(
      //쿼리 날리기
      "select * from CUSTOMER",
      (err, rows, fields)=>{
        res.send(rows);
      }
       
    );
});


app.listen(port, ()=> console.log(`listening on port ${port}`));