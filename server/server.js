const express = require('express');

//host the instance of express in "app"
const app = express();

const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
  console.log(`...Server running at ${PORT}!`)
})