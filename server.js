// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

//Breads
const breadsConstroller = require ('./controllers/breads_controller.js')
app.use('/breads', breadsConstroller)


// LISTEN
app.listen(PORT, () => {
  console.log('nomming at port', PORT);
})


// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})