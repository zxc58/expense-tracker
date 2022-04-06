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
      // return res.status(400).json({ errors: errors.array() });//
    }
    const searchResult = await User.findOne({ email: req.newUser.email })
    if (searchResult) { return res.send('name has sign up') }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.newUser.password, salt)
    req.newUser.password = hashPassword
    await User.create(req.newUser)
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/user/signup')
  }
})
router.get('/signout', (req, res) => {
  req.logout()
  res.redirect('/')
})
//
module.exports = router
