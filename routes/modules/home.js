//
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const {dateTransform} = require('../../myFunction')
//
router.get('/', async (req, res) => {
  // r
  try {
    const queryCondition = { userId: req.user._id }
    if (!req.query.filterByCategory)req.query.filterByCategory = 'all'
    const categoryList = await Category.find().lean().sort({ _id: 1 })
    for (const category of categoryList) {
      if (category.name === req.query.filterByCategory) {
        category.selected = 'selected'
        queryCondition.categoryId = category._id
      } else { category.selected = '' }
    }
    const recordList = await Record.find(queryCondition).populate(['userId', 'categoryId']).lean().sort({ date: -1 })
    for(const record of recordList){
      record.date=dateTransform(record.date)
    }
    res.locals.searchResults = recordList
    res.locals.categoryList = categoryList
    res.render('home')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
//
module.exports = router
