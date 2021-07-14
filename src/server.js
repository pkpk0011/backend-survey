const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
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

  app.post('/update', (req, res)=>{
    const sql = 'UPDATE `valuecount` SET value = value+1 WHERE type = ?';
    let type = req.body.type;
    let params = [type]
    connection.query(sql, params, function (err, result, fields) {
        if(err){
            console.log(err);
        };
    });
  });

  app.post('/orderby', (req, res) => {
      const sql = 'Select * from `valuecount` order by value desc;'
      connection.query(sql, function (err, result, fields) {
          if(err) {
              console.log(err);
          };
        res.json({topType: result});
      })
  });

module.exports = router;

app.listen(port, ()=>{
  console.log(`express is running on ${port}`);
});
