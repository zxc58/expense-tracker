//
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { userValidationGuard } = require('../../middleWare')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
//
router.get('/signin', (req, res) => {
  
  res.render('signin')
})
router.post('/signin', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/signin' }))

router.get('/signup', (req, res) => {
  res.render('signup')
})
router.post('/signup', userValidationGuard, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const searchResult = await User.findOne({ email: req.body.email })
    if (searchResult) { 
      req.flash("warningMessage",'email 已被註冊')
      return res.redirect("/user/signup")
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)
    req.body.password = hashPassword
    await User.create(req.body)
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
router.get('/signout', (req, res) => {
  req.logout()
  req.flash("successMessage",'登出成功')
  res.redirect('/user/signin')
})
//
module.exports = router
