const express = require('express');

//middleware
const bodyParser = require('body-parser') //to send json data for requests
const cookieParser = require('cookie-parser') //read cookies when we get requests

//host the instance of express in "app"
const app = express();
const mongoose = require('mongoose')
require('dotenv').config() //allows us to use the .env information here on server

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

//register middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//===============================
//           USERS
//===============================

app.post('/api/users/register', (req, res)=>{
  res.status(200);

})



const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
  console.log(`...Server running at ${PORT}!`)
})