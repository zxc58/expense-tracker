//
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const User = require('../../models/user')
const Record = require('../../models/record')
//
router.get('/', async (req, res) => {
  // r
  try {
    const userId = req.user._id
    const searchResults = await Record.find({ userId }).lean()
    res.send(searchResults)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
//
module.exports = router
