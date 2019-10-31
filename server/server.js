const express = require('express');
const app = express(); //host the instance of express in "app"

//middleware
const bodyParser = require('body-parser') //to send json data for requests
const cookieParser = require('cookie-parser') //read cookies when we get requests
//register middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//database
const mongoose = require('mongoose')
require('dotenv').config() //allows us to use the .env information here on server

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true) //so we can use 'unique' schema property
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{console.log('...connected to Mongoose!')});


// Models
const {User}  = require('./models/user')


//===============================
//           USERS
//===============================

app.get('/', (req, res) => res.send('Hello world!'))

//=== REGISTER new user ===
app.post('/api/users/register', (req, res)=>{

  const user = new User(req.body)  //from the model

  user.save((err, doc)=>{
    if(err) return res.json({success: false, err});

    res.status(200).json({
      success: true,
      userdata: doc
    })
  })
})

//=== user LOGIN ===
  // find the email (to see if user already in db)
  // check password
  // generate new token (if username and pass are correct)
app.post('/api/users/login', (req,res)=>{

  User.findOne({'email': req.body.email}, (err, user)=>{ //this 'user' is in reference to the json data we put in (not whole schema)
    if (!user) return res.json({loginSuccess: false, message: 'Auth failed, email found'});

    user.comparePassword(req.body.password, (err, isMatch)=>{
      if( !isMatch ) return res.json({loginSuccess: false, message: 'Wrong password'})

      //if 'isMatch' is true, generate token
      user.generateToken((err, user)=>{
        if (err) return res.status(400).send(err)

        // if everything is okay, store token as a cookie
        res.cookie('w_auth', user.token).status(200).json({ //([name of cookie], [value of cookie]) -> stores token as a cookie
          loginSuccess: true
        })

      })

    })


  })




})


const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
  console.log(`...SERVER running at ${PORT}!`)
})