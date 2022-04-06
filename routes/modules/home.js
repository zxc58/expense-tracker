//
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
/*這行不能刪*/const Category =require("../../models/category")
//
router.get('/', async (req, res) => {
  // r
  try {
    const queryCondition = { userId: req.user._id }
    if (req.query.filterByCategory&&req.query.filterByCategory!=="全部") { queryCondition.categoryId = req.query.filterByCategory }
    const searchResults = await Record.find(queryCondition).populate(['userId', 'categoryId']).lean().sort({ date: -1 })
    const categoryList = await Category.find().lean().sort({_id:1})
    res.locals.searchResults = searchResults
    res.locals.categoryList=categoryList
    res.locals.user = req.user
    res.render('home')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
//
module.exports = router
