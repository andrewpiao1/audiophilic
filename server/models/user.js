const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken') //JSON Web Token defines a self-contained way for securely transmitting information between parties as a JSON object; this information can be verified/trusted b/c it is digitally signed (using a key); encryption

require('dotenv').config(); //to be able to use "SUPERSECRETPASSWORD"

const SALT_I = 10;

const userSchema = mongoose.Schema({
  // === REQUIRED FIELDS ===
  email:{
    type: String,
    required: true, //value is required every time
    trim: true, //take out white spaces when stored
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
      type: String,
      required: true,
      maxlength: 100, //to limit length of the str
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  // === NOT 'REQUIRED' FIELDS ===
  cart:{
    type: Array,
    default: [], //if not present, set to default
  },
  history:{
    type: Array,
    default: []
  },
  role:{ //when user registers, they need a role (admin rights)
    type: Number,
    default: 0
  },
  token:{
    type: String
  }
});


//before we save() to db, we want to hash the password str (w/ bcrypt), using pre('[action]')

userSchema.pre('save', function(next){   //next for when you're finished and want to complete the rest of the process
  var user = this; //ES5 requires we create an alias for 'this'
  console.log("PRE-THIS", this)

  if (user.isModified('password')){ //only hash when we are saving a new user or modifying password (we do not want to re-hash password for say ex, name change)

    bcrypt.genSalt(SALT_I, (err, salt)=>{
      if (err) return next(err);

      bcrypt.hash(user.password, salt, null, (err, hash)=>{
        if (err) return next(err);
        user.password = hash;
        next()
      })
    })
  }else{ //move forward and not hash password again
    next()
  }
})

// === SCHEMA METHODS ===
userSchema.methods.comparePassword = function(candidatePassword, cb){ //cb so when we are done w/ the fxn, we can trigger it

  //since we are within the same fxn, 'this.password' will be the user.password
  bcrypt.compare(candidatePassword, this.password, (err, isMatch)=>{
    console.log('inside this.password: ', this.password)
    if (err) return cb(err);

    cb(null, isMatch) //returned 'isMatch' is a boolean
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this;

  //based on:  user.id + password (of the environment, that only server knows)
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET)

  user.token = token; //add token to user, then save
  user.save((err, user)=>{
    if (err) return cb(err);

    cb(null, user)
  })
}

  //Authentication ('statics' is a custom method)
userSchema.statics.findByToken = function(token, cb){
  var user = this;

  //decode token with jwt to get user id of user
  jwt.verify(token, process.env.SECRET, (err, decode)=>{ //if user._id is returned, token is valid
    user.findOne({'_id': decode, 'token': token}, (err, user)=>{
      if(err) return cb(err);

      cb(null, user);
    })
  })

}

const User = mongoose.model('User', userSchema) //creat a model from with name 'User' using userSchema

module.exports = { User }