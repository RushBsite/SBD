// 설치한 express 모듈 불러오기
const express = require('express')

// Node.js 기본 내장 모듈 불러오기
const http = require('http')
const fs = require('fs')

// express 객체 생성
const app = express()

// express http 서버 생성
const server = http.createServer(app)

var bodyParser = require('body-parser')
//router는 추후 추가 예정
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')
var path = require('path')
const PORT = 3000

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//세션 및 쿠키의 속성 설정
var session = session({
    //secret:'qWeR1_3-4AsDf',
    secret: 'team5',
    resave:true,
    saveUninitialized:true,
    //세션의 timeout 설정
    cookie:{maxAge:3600000*24}
});

app.use(session);
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(router) // router 정의

// 서버 가동(IPv4 형식으로 express 설정)
server.listen(PORT, '0.0.0.0', function(){
    console.log("서버가 시작되었습니다.(Port: "+PORT+")");
});