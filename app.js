//
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()
const port = parseInt(process.env.port)
const router = require('./routes/index')
//
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false
}))
app.use(express.urlencoded())
app.use('/', router)
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
