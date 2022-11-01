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
    res.render('register.ejs', {'message' : msg});
})

passport.serializeUser(function(user, done){
    done(null, user)
});
passport.deserializeUser(function(user, done){
    var ID = user.ID;
    var nickname = user.nickname;
    var type = user.type;
    // console.log('passport session get ID: '+ ID + '(' + nickname + ')')
    done(null, {'ID': ID, 'nickname':nickname, 'type':type}); // 세션에서 값을 뽑아서 페이지에 전달하는 역할
})

passport.use('local-join', new LocalStrategy({
        usernameField: 'ID',
        passwordField: 'password',
        pwcomField: 'pw_com',
        usertypeField: 'type',
        nicknameField: 'nickname',
        passReqToCallback: true
     }, function(req, ID, password, done){
            var query = connection.query('select * from userDB where ID=?', [ID], function(err, rows){
                var ip = requestIp.getClientIp(req);
                if(err) return done(err);

            if(rows.length){ // database에 입력한 ID값이 있는가?
                return done(null, false, {message : '중복된 ID입니다.'})
            }
            else{
                if(password != req.body.pw_com){ // 비밀번호와 확인이 같지 않은가?
                    return done(null, false, {message : '비밀번호가 일치하지 않습니다.'})
                }
                else{
                    var subqry = connection.query('select * from userDB where nickname=?', [req.body.nickname], function(err, rows_){
                        if(err) return done(err);
                        if(rows_.length){
                            return done(null, false, {message : '중복된 닉네임입니다.'})
                        }
                        else{
                            var sql = {ID: ID, password: password, type:req.body.type, nickname:req.body.nickname};
                            var query = connection.query('insert into userDB set ?', sql, function(err, rows){
                                if(err) throw err
                                return done(null, {'ID' : ID, 'nickname' : req.body.nickname, 'type': req.body.type});
                            })
                        }
                    })
                }
            }
        })
    }
));
router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/register',
    failureFlash: true
}))

module.exports = router;