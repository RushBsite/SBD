//require을 통해 node_modules에 있는 express를 가져올 수 있다.
const express = require("express");
const mysql = require('mysql')
//express의 반환값을 저장한다.
const app = express();

const db = mysql.createConnection({
  host:'52.95.252.83',
  user:'k8steam5',
  password:'k8steam5passwd',
  database:'team5',
  port:'30000'
});
db.connect();

app.get("/", (req, res) => {
  res.send("Test");
});


db.query("select * from user", (error,result)=>{
    if (error) return console.log(error, 'check')
    console.log(result);
  
  });

//3000번 포트로 서버를 오픈한다.
app.listen(3001, () => {
  console.log("Server On");
})
