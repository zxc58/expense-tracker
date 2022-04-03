//
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const User = require('../../models/user')
const Record = require('../../models/record')
const { validationGuard } = require('../../middleWare')
//
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', validationGuard, async (req, res) => {
  // c
  try {
    const result = await Record.create(req.newRecord)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})
router.get('/:_id/edit', async (req, res) => {
  // u
  try {
    const recordId = req.params._id
    const searchResults = await Record.findById(recordId).lean()
    res.render('edit', { searchResults })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
router.put('/:_id', validationGuard, async (req, res) => {
  // u
  try {
    const recordId = req.params._id
    const result = await Record.findByIdAndUpdate(recordId, req.newRecord)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})
router.delete('/:_id', async (req, res) => {
  // d
  try {
    const recordId = req.params._id
    const result = await Record.findByIdAndDelete(recordId)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})
//
module.exports = router
