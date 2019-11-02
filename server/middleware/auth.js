const { User } = require('../models/user');

let auth = (req, res, next) => {
  //checking if token is correct
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user)=>{
    if(err) throw err;
    if( !user ) return res.json({
      isAuth: false,
      error: true
    })

    req.token = token;
    req.user = user; //attach token-matched user to the req
    next();

  })

}


module.exports = { auth }