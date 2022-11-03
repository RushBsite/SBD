var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var requestIp = require('request-ip');

var main = require('./Main/main')
var register = require('./Register/index_register')
var login = require('./Login/index_login')
var logout = require('./Logout/index_logout')


// URL routing
// req = request, res = respond
router.get('/', function(req, res){
    try{
        var ip = requestIp.getClientIp(req);
        var id = req.user;
        if(!id){
            res.sendFile(path.join(__dirname, "./Main/main.html"))
        }
        if(id){
            var nickname = req.user.nickname;
            res.render('main.ejs', {'ID': id, 'nickname': nickname});
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