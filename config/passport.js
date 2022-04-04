//
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
//
function usePassport (app) {
  app.use(passport.initialize())
  app.use(passport.session())
  // 這邊設定登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
      try {
        const searchDbResult = await User.findOne({ name: email })
        if (!searchDbResult) { return done(null, false) }
        const passwordCompareResult = await bcrypt.compare(password, searchDbResult.password)
        if (!passwordCompareResult) { return done(null, false) }
        return done(null, searchDbResult)
      } catch (error) {
        console.log(error)
      }
    })
  )
  //
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
//
module.exports = usePassport
