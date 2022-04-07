//
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { recordValidationGuard } = require('../../middleWare')
const { validationResult } = require('express-validator')
const {dateTransform} = require('../../myFunction')
//
router.get('/new', async (req, res) => {
  res.locals.title = 'New Record'
  res.locals.action = '/record'
  res.locals.categoryList = await Category.find().lean().sort({ _id: 1 })
  return res.render('record')
})
router.post('/', recordValidationGuard, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    req.body.userId = req.user._id
    console.log(req.body)
    await Record.create(req.body)
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.send('錯誤page')
  }
})
router.get('/:_id/edit', async (req, res) => {
  try {
    const _id = req.params._id
    const userId = req.user._id
    res.locals.title = 'Edit Record'
    res.locals.action = `/record/${_id}?_method=PUT`
    const searchResult = await Record.findOne({ _id,userId }).populate(['userId', 'categoryId']).lean()
    const categoryList = await Category.find().lean().sort({ _id: 1 })
    if (!searchResult) {
      return res.send('錯誤page')
    }
    searchResult.date=dateTransform(searchResult.date)
    for (const category of categoryList) {
      if (category.name === searchResult.categoryId.name) {
        category.selected = 'selected'
      } else { category.selected = '' }
    }
    res.locals.searchResult = searchResult
    res.locals.categoryList = categoryList
    return res.render('record')
  } catch (error) {
    console.log(error)
    return res.send('錯誤page')
  }
})
router.put('/:_id', recordValidationGuard, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });//
    }
    const _id = req.params._id
    const userId = req.user._id
    const searchResult = await Record.findOneAndUpdate({ _id, userId }, req.newRecord)
    if (!searchResult) {
      return res.status(400)
    }
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    return res.send('錯誤page')
  }
})
router.delete('/:_id', async (req, res) => {
  try {
    const _id = req.params._id
    const userId = req.user._id
    const searchResults = await Record.findOneAndDelete({ _id, userId })
    if (!searchResults) {
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
