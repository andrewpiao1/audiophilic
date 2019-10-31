const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema) //creat a model from with name 'User' using userSchema

module.exports = { User }