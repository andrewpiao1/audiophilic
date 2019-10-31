const express = require('express');

//middleware
const bodyParser = require('body-parser') //to send json data for requests
const cookieParser = require('cookie-parser') //read cookies when we get requests

//host the instance of express in "app"
const app = express();
const mongoose = require('mongoose')
require('dotenv').config() //allows us to use the .env information here on server

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

//register middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models
const {User}  = require('./models/user')


//===============================
//           USERS
//===============================

app.get('/', (req, res) => res.send('Hello world!'))


app.post('/api/users/register', (req, res)=>{

  const user = new User(req.body)  //from the model

  user.save((err, doc)=>{
    if(err) {
      return res.json({success: false, err});
    }

    res.status(200).json({
      success: true,
      userdata: doc
    })
  })
})



const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
  console.log(`...Server running at ${PORT}!`)
})