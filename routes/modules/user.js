//
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { userValidationGuard } = require('../../middleWare')
const Category = require('../../models/category')
const User = require('../../models/user')
const Record = require('../../models/record')
//
router.get('/signin', (req, res) => {
  res.send("sign in page")
})
router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/signin' }))
router.get('/signup', (req, res) => {
  res.send("sign up page")
})
router.post('/signup', userValidationGuard, async (req, res) => {
  try {
    const searchResult =  await User.findOne({name:req.newUser.name})
    if(searchResult)
      return res.send("name has sign up")
    await User.create(req.newUser)
    return res.redirect('/')
    
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
router.get('/signout', (req, res) => {
  req.logout()
  res.redirect("/")
})
//
module.exports = router
