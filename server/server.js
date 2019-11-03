const express = require('express');

//MIDDLEWARE
const bodyParser = require('body-parser') //to send json data for requests
const cookieParser = require('cookie-parser') //read cookies when we get requests

const { auth } = require ('./middleware/auth')
const { admin } = require ('./middleware/admin')

const app = express();
  //register middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

//DATABASE
const mongoose = require('mongoose')
require('dotenv').config() //allows us to use the .env information here on server

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true) //so we can use 'unique' schema property
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

  //check connection
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{console.log('...connected to Mongoose!')});


//MODELS
const { User}  = require('./models/user')
const { Brand } = require('./models/categories/brand')
const { Type } = require('./models/categories/type')
const { Product } = require('./models/product')


//===============================
//           USERS
//===============================

// === AUTHENTICATION ===
  // 1) get a req from endpoint, then go to
  // 2) auth middleware fxn, until next

app.get('/api/users/auth', auth, (req, res)=>{   //cookies are inside req
  // req now has the user data AND the token attached
  // if allowed to proceed forward (next):
  res.status(200).json({
    // user: req.user,
    isAdmin: (req.user.role ===0) ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,

    cart: req.user.cart,
    history: req.user.history
  })
})

// === LOGOUT ===
app.get('/api/user/logout', auth, (req, res)=>{ //user can only log out if they're logged in (authenticated)

  User.findOneAndUpdate({_id: req.user},
    {token: ''}, //update
    (err, doc) => {
      if (err) return res.json({sucess: false, err})

      return res.status(200).send({success: true}) //if token successfully removed (user logged out)
    }
  )
})
  //user 'token' property now empty str; trying to enter somewhere that needs auth will fail (will need to log in again to generate a new token)

//=== REGISTER new user ===
app.post('/api/users/register', (req, res)=>{

  const user = new User(req.body)  //from the model

  user.save((err, doc)=>{
    if(err) return res.json({success: false, err});

    res.status(200).json({
      success: true,
      // userdata: doc
    })
  })
})

//=== user LOGIN ===
  // find the email (to see if user already in db)
  // check password
  // generate new token (if username and pass are correct)

app.post('/api/users/login', (req,res)=>{

  User.findOne({'email': req.body.email}, (err, user)=>{ //this 'user' is in reference to the json data we put in (not whole schema)
    if (!user) return res.json({loginSuccess: false, message: 'Auth failed, email not found'});

    //if user found, compare 'entered password', to the stored hash
    user.comparePassword(req.body.password, (err, isMatch)=>{

      if( !isMatch ) return res.json({loginSuccess: false, message: 'Wrong password'})

    //if 'isMatch' is true, generate token:
      user.generateToken((err, user)=>{  //token used in the app to see if user is registered/has access to private routes
        if (err) return res.status(400).send(err)

    //if token generated, store it as a cookie:
        res.cookie('w_auth', user.token).status(200).json({ // to store: ([name of cookie], [value of cookie])
          loginSuccess: true
        })
      })
    })
  })

})

//===============================
//        * PRODUCTS *
//===============================


app.post('/api/product/item', auth, admin, (req, res)=>{
  const product = new Product(req.body);

  product.save((err, doc)=>{
    if (err) return res.json({success: false, err})

    res.status(200).json({
      success: true,
      item: doc
    })
  })

})

//2 ways of getting information from client to server:
  //1 sending a JSON
  //2 query string - /api/product/item?id=xxx,xxx,xxx&type=yyy (ie array or single)

app.get('/api/product/items_by_id', (req, res)=>{
  let type = req.query.type; //allowed by bodyParser.urlencoded()
  let items = req.query.id;

 // determine if multiple items by checking type
  if (type === 'array'){
    let ids = req.query.id.split(',');

    items = []; //convert to array
    items = ids.map( item =>{  //convert 'items' ids into ObjectIds on mongoose
      return mongoose.Types.ObjectId(item)
    })
  }

  Product.find({'_id':{$in:items}}) //can check whether field equals any value in an Array (or single)
    .populate('brand') //specifying which FIELD you want to populate
    .populate('type')
    .exec((err, docs)=>{
      return res.status(200).send(docs)
    })
})


//===============================
//           BRAND
//===============================

// POST a brand
app.post('/api/product/brand', auth, admin, (req, res)=>{ //chain an additional admin middleware
  const brand = new Brand(req.body)

  brand.save((err, doc)=>{  //doc: what's returned from mongo
    if (err) return res.json({success: false, err})

    res.status(200).json({
      success: true,
      brand: doc
    })
  })
})

// GET a brand
app.get('/api/product/get_brands', (req, res)=>{
  Brand.find({}, (err, brands)=>{
    if (err) return res.status(400).send(err)

    res.status(200).send(brands)
  })
})

//===============================
//         SYSTEM TYPE
//===============================

app.post('/api/product/type', auth, admin, (req,res)=>{
  const type = new Type(req.body)

  type.save((err, doc)=>{
    if (err) return res.json({success: false, err})

    res.status(200).json({success: true, type: doc })
  })
})

app.get('/api/product/get_types', (req, res)=>{
  Type.find({}, (err, types)=>{
    if (err) return res.status(400).send(err);

    res.status(200).send(types)
  })
})



const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
  console.log(`...SERVER running at ${PORT}!`)
})