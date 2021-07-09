const express = require('express');
const app = express();
const port = 3001; //process.env.PORT || 
const mysql = require('mysql');
const cors = require('cors');
const { response } = require('express');
const router = express.Router();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'96105703',
    port:3306,
    database:'datamond'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connectecd');
});

app.post('/create', (req, res)=>{
    const sql = 'INSERT INTO `totalvalue`(`nickname`, `result`) VALUES(?, ?)';
    let user_nickname = req.body.user_nickname;
    let user_result = req.body.user_result;
    let params = [user_nickname, user_result]
    connection.query(sql, params, function (err, result, fields) {
        if(err){
            console.log(err);
        }
    });
  });

  app.post('/total', (req, res)=>{
    const sql = 'Select COUNT(id) as cnt from `totalvalue`';
    connection.query(sql, function (err, result, fields) {
        if(err){
            console.log(err);
        };
        let clientTotal = result[0].cnt;
        res.json({clientTotal: clientTotal});
    });
  });


module.exports = router;

app.listen(port, ()=>{
  console.log(`express is running on ${port}`);
});
