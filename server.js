
//Dependencies
const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT
const app = express()
console.log(PORT)
const methodOverride = require('method-override')
const mongoose = require('mongoose')


//Middleware
app.use(express.static('public'))
app.set('views',__dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

//Mongoose connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

//Routes
app.get('/', (req, res) =>{
    res.send("Welcome to my app about BREAD$")
})
// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

app.listen(PORT, () =>{
    console.log('nomming at port', PORT)
})

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})