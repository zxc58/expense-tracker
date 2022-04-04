//

//
module.exports = {
  userValidationGuard: (req, res, next) => {
    const { body: { name, password, email } } = req
    // 這邊驗證資料格式是否正確
    req.newUser = { name, password, email }
    next()
  },
  recordValidationGuard: (req, res, next) => {
    const userId = req.user._id
    const { body: { name, amount, date, categoryId } } = req
    // 這邊驗證資料格式是否正確
    req.newRecord = { name, amount, date, categoryId, userId }
    next()
  },
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/user/signin')
  }
}
