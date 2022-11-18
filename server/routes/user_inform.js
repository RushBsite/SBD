const express = require('express');
const router = express.Router();
const db = require('../config/db');
const util = require('util');
 
router.get('/login', (req, res) => {
	// 임시로 값을 넣어 주었다.
    res.send({datas: 'data'})
});

router.get('/register', (req, res) => {
	// 임시로 값을 넣어 주었다.
    res.send({datas: 'data'})
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
            res.send('register ok')
        } else {
            res.send(err)
        }
    })
});


module.exports = router;