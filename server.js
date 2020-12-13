let express = require('express');
let app = express();
const cors = require('cors');

let mysql = require('mysql');
let bodyParser = require('body-parser');

const selectAllMovie = 'select * from movie';

app.use(cors());
app.use(bodyParser.json({type:'application/json'}))
app.use(bodyParser.urlencoded({extended:true}));

let db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'MovieRental'
})

db.connect(function(error){
  if(error) console.log(error);
  else console.log('connected');
})

app.get('/user', (req,res)=>{
  db.query('select * from user', function(error,rows,fields){
    if(error) console.log(error)
    else console.log(rows)
  })
});

app.get('/movies', (req, res)=>{
  db.query(selectAllMovie, (err, results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/movies/search', (req, res)=>{
  const {text} = req.query
  db.query(`select * from movie where movie_name like ?`,[`%${text}%`], (err, results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/user/add', (req,res)=>{
  const {user_fname, user_lname, user_email, user_password, user_address} = req.query
  const user_add = `Insert into user (user_fname, user_lname, user_email, user_password, user_address) VALUES(${user_fname},${user_lname},${user_email},${user_password},${user_address})`
  db.query(user_add, (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/user/info'), (req,res)=>{
  const {user_id} = req.query
  const user_info = `select * from user where user_id=(user_id) VALUE(${user_id})`
  db.query(user_info, (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
}

app.get('/payment'), (req,res)=>{
  const {user_id} = req.query
  const payment = `select * from Payment where user_id=(user_id) VALUE(${user_id})`
  db.query(payment, (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
}

app.listen(4000, ()=>{
  console.log('backend on 4000')
})