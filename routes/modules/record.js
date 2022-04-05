//
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const User = require('../../models/user')
const Record = require('../../models/record')
const { recordValidationGuard } = require('../../middleWare')
//
router.get('/new', (req, res) => {
  return res.send('new record page')
})
router.post('/', recordValidationGuard, async (req, res) => {
  // c
  try {
    const result = await Record.create(req.newRecord)
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.send("錯誤page")
  }
})
router.get('/:_id/edit', async (req, res) => {
  // u
  try {
    const _id = req.params._id
    const userId = req.user._id
    const searchResult = await Record.findOne({_id,userId}).lean()
    if(!searchResult){
      return res.send('錯誤page')
    }
    return res.send({editRecordPage :searchResult})
  } catch (error) {
    console.log(error)
    return res.send('錯誤page')
  }
})
router.put('/:_id', recordValidationGuard, async (req, res) => {
  // u
  try {
    const _id = req.params._id
    const userId = req.user._id
    const searchResult = await Record.findOneAndUpdate({_id,userId},req.newRecord)
    if(!searchResult){
      return res.send('錯誤page')
    }
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.send('錯誤page')
  }
})
router.delete('/:_id', async (req, res) => {
  // d
  try {
    const _id = req.params._id
    const userId = req.user._id
    const searchResults = await Record.findOneAndDelete({_id,userId})
    if(!searchResults){
      return res.send('錯誤page')
    }
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.send('錯誤page')
  }
})
//
module.exports = router
