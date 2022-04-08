module.exports = {
  dateTransform: (dateObject) => {
    const year = dateObject.getFullYear().toString()
    const month = dateObject.getMonth() > 8 ? (1 + dateObject.getMonth()).toString() : '0' + (1 + dateObject.getMonth()).toString()
    const date = dateObject.getDate() > 9 ? dateObject.getDate().toString() : '0' + dateObject.getDate().toString()
    return `${year}-${month}-${date}`
  }
}
