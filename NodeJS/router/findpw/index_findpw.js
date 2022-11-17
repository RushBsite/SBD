var express = require('express')
var app = express()
var router = express.Router();
var path = require('path') // 상대경로
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var requestIp = require('request-ip');

// database setting
var connection = mysql.createConnection({
    host:'52.95.252.83',
    user:'k8steam5',
    password:'k8steam5passwd',
    database:'team5',
    port:'30000'
})
connection.connect();

router.get('/', function(req, res){
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    var ip = requestIp.getClientIp(req);

    res.render('findpw.ejs', {'message' : msg});
});
router.post('/', function(req, res){
    const inputID = document.getElementById("ID").value;
    const inputEMAIL = document.getElementById("EMAIL").value;
    const inputBIRTH = document.getElementById("BIRTH").value;
    console.log(inputID, inputEMAIL, inputBIRTH);

    var sql = "select * from user where ID = ?;"
    connection.query(sql, [inputID], function(err, rows, fields){
        if(err){
            console.log(err);
        } else {
            if(inputEMAIL != rows[0].EMAIL) {
                console.log(inputEMAIL, rows[0].EMAIL);
                inputEMAIL.setCustomValidity("EMAIL Don't Match");
            } else if(inputBIRTH != rows[0].BIRTH) {
                console.log(inputBIRTH, rows[0].BIRTH);
                inputBIRTH.setCustomValidity("BIRTH Don't Match");
            } else {
                console.log("solved")
                console.log(inputEMAIL, rows[0].EMAIL);
                console.log(inputBIRTH, rows[0].BIRTH);
                inputBIRTH.setCustomValidity('');
            }
        }
    });
    res.redirect("/findpw");
});

module.exports = router;