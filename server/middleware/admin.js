const { User } = require('../models/user')

//middleware to check the 'role'
const admin = (req, res, next)=>{
  if(req.user.role === 0){
    return res.send('ADMIN ERROR: you are not allowed')
  }

  next();
}

 module.exports = { admin }