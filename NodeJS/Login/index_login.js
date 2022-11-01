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
    host: 'localhost',
    port : 3306,
    user: 'root',
    password : '',
    database : 'singer_composer'
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
    done(null, user)
});

passport.deserializeUser(function(user, done){
    var ID = user.ID;
    var nickname = user.nickname;
    var type = user.type;
    // console.log('passport session get ID: '+ ID + '(' + nickname + ')')
    done(null, {'ID': ID, 'nickname':nickname, 'type': type}); // 세션에서 값을 뽑아서 페이지에 전달하는 역할
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'ID',
        passwordField: 'password',
        passReqToCallback: true
     }, function(req, ID, password, done){
            var query = connection.query('select * from userDB where ID=?', [ID], function(err, rows){
            if(err) return done(err);
            
            var ip = requestIp.getClientIp(req);
            if(rows.length){ // database에 입력한 ID값이 있는가?
                if(password == rows[0].password){ // 비밀번호와 확인이 같은가?
                    return done(null, {'ID' : ID, 'nickname' : rows[0].nickname, 'type': rows[0].type});
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