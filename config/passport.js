//
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')
//
function usePassport (app) {
  app.use(passport.initialize())
  app.use(passport.session())
  // 這邊設定登入策略
  passport.use(new LocalStrategy(
    async (name, password, done) => {
      try {
        const result = await User.findOne({ name })
        if (!result) { return done(null, false) }
        if (!result.verifyPassword(password)) { return done(null, false) }
        return done(null, result)
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
