const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
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

  // === NOT 'REQUIRED' ===
  cart:{
    type: Array,
    default: [], //if there's nothing there, set to default
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
  let user = this; //ES5 requires we create an alias for 'this'

  bcrypt.genSalt(SALT_I, (err, salt)=>{
    if (err) return next(err);

    if(user.isModified('password')){  // if changing password ***
      bcrypt.hash(user.password, salt, null, (err, hash)=>{
        if (err) return next(err);

        user.password = hash;
        next()
      })
    }else{ //move forward and not hash password again
      next();
    }


  })
})

//***  if user wants to change name for ex, we do not want to re-hash password (we only want it when they want to change password)



const User = mongoose.model('User', userSchema) //creat a model from with name 'User' using userSchema

module.exports = { User }