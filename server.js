const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = knex(
  {
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'arsenal360',
    database : 'face-detect'
  }
}
);

//root endpoint
app.get('/', (req, res)=> {
 res.send('connected proceed');
})

// signin endpoint
app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});

//register endpoint 
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

// profile endpoint
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});

//image endpoint 
app.put('/image', (req,res) =>{image.handleImage(req,res,db)});

//imageUrl end point
app.post('/imageUrl', (req,res) => { image.handleApiCall(req,res)} );

app.listen(5000, ()=> {
  console.log('app is running on port 5000');
});
