const CustomError = require('../utils/CustomError')

const handle404 = (req, res, next) => {
  next(new CustomError('Page Not Found', 404))
}

module.exports = handle404