var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var requestIp = require('request-ip');


router.get('/', function(req, res){
    var ip = requestIp.getClientIp(req);
    var id = req.user;
    if(!id){
        res.redirect('/main')
    }
    else{
        req.logout((err) => {
            req.session.save();
            res.redirect('/');
        });
        //req.session.save(function(){
        //    res.redirect('/');
        //})
    }
});

module.exports = router;