//
const { body } = require('express-validator')
//
module.exports = {
  userValidationGuard: [body('email').isEmail(), body('passward').isLength({ min: 8, max: 14 }), body('password').isAlphanumeric(), body('name').notEmpty()],
  recordValidationGuard: [body('name').notEmpty(), body('amount').isInt({ allow_leading_zeroes: false, min: 0 }), body('date').isDate(), body('categoryId').isMongoId()],
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user
      return next()
    }
    res.redirect('/user/signin')
  }
}
