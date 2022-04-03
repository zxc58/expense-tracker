//

//
module.exports = {
  validationGuard: (req, res, next) => {
    const {body:{name,amount,date,categoryId}}= req
    //這邊驗證資料格式是否正確
    req.newRecord={name,amount,date,categoryId,}//還有userId
    next()
  }
}
