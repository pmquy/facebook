import CustomError from '../utils/CustomError.js'

const handle404 = (req, res, next) => {
  next(new CustomError('Page Not Found', 404))
}

export default handle404