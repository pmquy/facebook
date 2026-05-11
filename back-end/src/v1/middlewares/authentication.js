import jwt from 'jsonwebtoken'
import UserService from '../services/user.js'
import User from '../models/User.js'

const auth = async (req, res, next) => {
  try {    
    const decode = jwt.verify(req.cookies.access_token , process.env.TOKEN_SECRET)
    req.user = await UserService.getById(decode._id)
    req.user._id = req.user._id.toString()
    if(req.user) return next()
    throw new Error()
  } catch(err) {
    next(err)
  }
}

export default auth