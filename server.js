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
  db.query('select * from user', (err,results)=>{
    if(err) console.log(err)
    else return res.json({
      data: results
    })
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
  const {user_id, user_fname, user_lname, user_email, user_password, user_address} = req.query
  const user_add = `Insert into user (user_id, user_fname, user_lname, user_email, user_password, user_address) VALUES(?,?,?,?,?,?)`
  db.query(user_add,[user_id, user_fname,user_lname,user_email,user_password,user_address], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/user/logins', (req,res)=>{
  const {email} = req.query
  const user_add = `select user_id from user where user_email like ?`
  db.query(user_add,[`%${email}%`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/user/info', (req,res)=>{
  const {user_id} = req.query
  const user_info = `select * from user where user_id like ?`
  db.query(user_info, [`${user_id}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/payment', (req,res)=>{
  const {user_id} = req.query
  const payment = `select * from Payment where User_user_id like ?`
  db.query(payment,[`${user_id}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/order/info', (req,res)=>{
  const {payment_id} = req.query
  const order = `select * from orders where payment_payment_id like ?`
  db.query(order,[`${payment_id}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/movie/actor', (req,res)=>{
  const {name} = req.query
  const q = `select * from actor where actor_name like ?`
  db.query(q,[`${name}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/movie/actor/search', (req,res)=>{
  const {actor_id} = req.query
  const q = `select * from movie_actor where Actor_actor_id like ?`
  db.query(q,[`${actor_id}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/movie/actor/search/name', (req,res)=>{
  const {movie_id} = req.query
  const q = `select * from movie where movie_id like ?`
  db.query(q,[`${movie_id}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/movie/genre', (req,res)=>{
  const {genre} = req.query
  const q = `select * from movie where genre like ?`
  db.query(q,[`${genre}`], (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.get('/movie/rating', (req,res)=>{
  const q = `select * from movie where movie_rating=5`
  db.query(q, (err,results)=>{
    if(err) return err
    else return res.json({
      data: results
    })
  })
})

app.listen(4000, ()=>{
  console.log('backend on 4000')
})