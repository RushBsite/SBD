const express = require('express');
const router = express.Router();
const db = require('../config/db');
const util = require('util');

var bulletinIndex = 1;
 
router.get('/login', (req, res) => {
	// 임시로 값을 넣어 주었다.
    res.send({datas: 'data'})
});

router.get('/register', (req, res) => {
	// 임시로 값을 넣어 주었다.
    res.send({datas: 'data'})
});

router.get('/InitIndex', (req,res) => {
    bulletinIndex = 1;
});

router.get('/indexbulletin', (req, res) => {
    const sql1 = 'SELECT * FROM party where ID = ?'
    //console.log(bulletinIndex);
    db.query(sql1, bulletinIndex, (err, data) => {
        if(!err){
            res.send(data[0])
            //console.log(data[0])
            bulletinIndex = bulletinIndex + 1
        } else {
            res.send('sql query error')
        }
    })

});

router.post('/commentreturn', (req,res) => {
    const form_id = req.query.form_id
    const sql1 = 'select * from comment where partyID = ?;'
    
    db.query(sql1,form_id, (err, data) => {
        if(!err){
            console.log('comment returned')
            res.send(data)
        } else {
            res.send("sql query error")
        }
    })

});

router.post('/formsubmit', (req, res) => {
    const user_id = req.query.user_id
    const market = req.query.market
    const content = req.query.content
    const sql1 = 'insert into party(owner, market, content) values(?,?,?);'

    params = [user_id, market, content]
    db.query(sql1, params, (err) => {
        if(!err){
            console.log('formsubmit')
            res.send('formsubmit ok')
        } else {
            console.log(err)
            res.send("sql query error")
        }
    })

});

router.post('/commentsubmit', (req,res) => {
    const user_id = req.query.user_id
    const content = req.query.content
    const menu = req.query.menu
    const price = req.query.price
    const partyID = req.query.partyID
    const sql1 = 'insert into comment(user, content, menu, price, partyID) values(?,?,?,?,?);'

    params = [user_id, content, menu, price, partyID]
    db.query(sql1,params, (err)=>{
        if(!err){
            console.log('comment submit ok')
            res.send('comment submit ok')
        } else {
            console.log('comment submit error')
            res.send("sql query error")
        }
    })

});

router.post('/index_defaul_address', (req, res) => {
    const user_id = req.query.user_id
    const sql1 = 'SELECT ADDRESS FROM user WHERE ID = ?;'

    db.query(sql1, user_id, (err, data) => {
        if(!err){
            res.send(data[0])
        } else {
            res.send("sql query error")
        }
    })
});

router.post('/address_save', (req, res) => {
    const user_id = req.query.user_id
    const user_address = req.query.user_address
    
    const sql1 = 'update user set ADDRESS = ? where ID = ?;'
    var params = [user_address, user_id]
    db.query(sql1, params, (err) => {
        if(err){console.log(err)}
    })
});

router.post('/onLogin', (req, res) => {
    //console.log(`= = = > req : ${util.inspect(req)}`)
   	// user_id, user_pw 변수로 선언
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
    // 입력된 id 와 동일한 id 가 mysql 에 있는 지 확인
    const sql1 = 'SELECT COUNT(*) AS result FROM user WHERE ID = ?'
    db.query(sql1, user_id, (err, data) => {
        if(!err) {
        	// 결과값이 1보다 작다면(동일한 id 가 없다면)
            if(data[0].result < 1) {
                res.send({ 'msg': '입력하신 id 가 일치하지 않습니다.'})
            } else { // 동일한 id 가 있으면 비밀번호 일치 확인
                const sql2 = `SELECT 
                                CASE (SELECT COUNT(*) FROM user WHERE ID = ? AND PASSWORD = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT ID FROM user WHERE ID = ? AND PASSWORD = ?)
                                END AS userId
                                , CASE (SELECT COUNT(*) FROM user WHERE ID = ? AND PASSWORD = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT PASSWORD FROM user WHERE ID = ? AND PASSWORD = ?)
                                END AS userPw`;
                // sql 란에 필요한 parameter 값을 순서대로 기재
                const params = [user_id, user_pw, user_id, user_pw, user_id, user_pw, user_id, user_pw]
                db.query(sql2, params, (err, data) => {
                    if(!err) {
                        res.send(data[0])
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })
});


router.post('/onRegister', (req,res) => {
    const user_id = req.query.user_id
    const user_pw = req.query.user_pw
    const user_email = req.query.user_email
    const user_birth = req.query.user_birth
    const user_address = req.query.user_address
    const sql1 = 'insert into user(ID, PASSWORD, EMAIL, BIRTH, ADDRESS) values(?, ?, ?, ?, ?);'
    var params = [user_id, user_pw, user_email, user_birth, user_address]
    db.query(sql1, params, (err) => {
        if(!err){
            res.send(true)
        } else {
            res.send(err)
        }
    })
});


module.exports = router;