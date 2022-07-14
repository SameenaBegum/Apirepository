/**
 * @author Dominic
 * @email Dominic.s@skeintech.com
 * @create date 2021-01-11 
 * @modify date 2021-01-23 
 * @desc [description]
 */

var mysql = require('mysql2');


 /**
  * Dot env configuration
  */
 

 var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'apidatabase',
    port :3307,
    multipleStatements: true,
    dateStrings: true
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('database connected ....');
    }
});
 
 
 
 module.exports = db
 
 
 