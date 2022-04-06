//
require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const usePassport = require('./config/passport')
const router = require('./routes/index')

const app = express()
const port = parseInt(process.env.port)
//
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(express.static('public'))
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use('/', router)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
