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
    res.render('register.ejs', {'message' : msg});
})

passport.serializeUser(function(user, done){
    console.log('serialize', user);
    done(null, user)
});
passport.deserializeUser(function(user, done){
    var ID = user.ID;
    var userAddress = user.userAddress;
    var orderlist = user.orderlist;
    // console.log('passport session get ID: '+ ID + '(' + nickname + ')')
    done(null, {'ID': ID, 'userAddress':userAddress, 'orderlist':orderlist}); // 세션에서 값을 뽑아서 페이지에 전달하는 역할
})

passport.use('local-join', new LocalStrategy({
        usernameField: 'ID',
        passwordField: 'password',
        pwcomField: 'pw_com',
        userAddressField: 'userAddress',
        passReqToCallback: true
     }, function(req, ID, password, done){
            var query = connection.query('select * from user where id=?', [ID], function(err, rows){
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
                    var sql = {ID: ID, password: password, userAddress:req.body.userAddress};
                    var query = connection.query('insert into user set ?', sql, function(err, rows){
                        if(err) throw err
                        return done(null, {'ID' : ID, 'userAddress' : req.body.userAddress});
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