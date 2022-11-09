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
    res.render('login.ejs', {'message' : msg});
})

passport.serializeUser(function(user, done){
    console.log('serialize', user);
    done(null, user)
});

passport.deserializeUser(function(user, done){
    var ID = user.ID;
    var userAddress = user.userAddress;
    var EMAIL = user.EMAIL
    var BIRTH = req.user.BIRTH
    // console.log('passport session get ID: '+ ID + '(' + nickname + ')')
    done(null, {'ID': ID, 'userAddress':userAddress, 'EMAIL':EMAIL, 'BIRTH':BIRTH}); // 세션에서 값을 뽑아서 페이지에 전달하는 역할
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'ID',
        passwordField: 'password',
        passReqToCallback: true
     }, function(req, ID, password, done){
            var query = connection.query('select * from user where ID=?', [ID], function(err, rows){
            if(err) return done(err);
            
            var ip = requestIp.getClientIp(req);
            if(rows.length){ // database에 입력한 ID값이 있는가?
                if(password == rows[0].PASSWORD){ // 비밀번호와 확인이 같은가?
                    return done(null, {'ID' : ID, 'userAddress' : rows[0].userAddress, 'EMAIL': rows[0].EMAIL, 'BIRTH': rows[0].BIRTH});
                }
                else{
                    return done(null, false, {message : '잘못된 비밀번호입니다.'})
                }
            }
            else{
                return done(null, false, {message : 'ID를 찾을 수 없습니다.'})
            }
        })
    }
));

router.post('/', passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;