const mysql = require('mysql');

const db = mysql.createPool({
    host:'52.95.252.83',
    user:'k8steam5',
    password:'k8steam5passwd',
    database:'team5',
    port:'30000'
});
 
module.exports = db;
