const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  description: {
    require: true,
    type: String,
    maxlength: 10000
  },
  price:{
    require: true,
    type: Number,
    maxlength: 255
  },
  shipping: {
    required: true,
    type: Boolean
  },
  available: {
    required: true,
    type: Boolean
  },
  powerOutput:{
    required: true,
    type: Number
  },
  sold:{
    type: Number,
    default: 0,    //setting default value when new product added
    maxlength: 255
  },
  publish:{       //for new products in DB you don't want displayed yet
    required: true,
    type: Boolean
  },
  images:{
    type: Array,
    default: []
  },

  brand: { // making a reference to the _id of the 'Brand' model
    required: true,
    type: Schema.Types.ObjectId, //telling it's a reference to an ObjectId (alias: mongoose.Schema.Types.ObjectId)
    ref: 'Brand'
  },
  type: {
    required: true,
    type: Schema.Types.ObjectId, //1
    ref: 'Type' //2

    //when populate(): search (2) model, for (1) ObjectId
  }

}, {timestamps: true}); //to automatically generate a timestamp when product is added

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }