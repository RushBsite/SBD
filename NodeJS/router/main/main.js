var express = require('express')
var app = express()
var router = express.Router();
var path = require('path') // 상대경로
var requestIp = require('request-ip');

// main page는 login이 된 상태(세션정보가 있을때만) 접근이 가능하게 하자
router.get('/', function(req, res){
    var ip = requestIp.getClientIp(req);
    var id = req.user;
    if(!id){
        res.sendFile(path.join(__dirname, "../../public/main.html"))
    }
    if(id){
        var address = req.user.userAddress
        var EMAIL = req.user.EMAIL
        var BIRTH = req.user.BIRTH
        res.render('main.ejs', {address : address, EMAIL : EMAIL, BIRTH, BIRTH});
    }
});

module.exports = router;