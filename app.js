//
require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const router = require('./routes/index')
const methodOverride = require('method-override')
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
app.use('/', router)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
