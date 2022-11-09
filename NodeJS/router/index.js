var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var requestIp = require('request-ip');

var main = require('./main/main')
var register = require('./register/index_register')
var login = require('./login/index_login')
var logout = require('./logout/index_logout')


// URL routing
// req = request, res = respond
router.get('/', function(req, res){
    try{
        var ip = requestIp.getClientIp(req);
        var id = req.user;
        if(!id){
            res.sendFile(path.join(__dirname, "../public/main.html"))
        }
        if(id){
            //var nickname = req.user.nickname;
            //res.render('main.ejs', {'ID': id});
            var uid = req.user.id;
            var address = req.user.userAddress
            var orderlist = req.user.orderlist
            res.render('main.ejs', {UID : uid, one : "this is one", address : address, orderlist : orderlist});
        }
    }
    catch{
        res.redirect('/main')
    }
});

// router 정의
router.use('/main', main)
router.use('/register', register)
router.use('/login', login)
router.use('/logout', logout)
module.exports = router;