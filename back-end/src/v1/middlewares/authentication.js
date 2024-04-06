import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
  try {    
    const decode = jwt.verify(req.cookies.access_token , process.env.TOKEN_SECRET)
    req.user = await User.findById(decode._id)
    if(req.user) return next()
    throw new Error()
  } catch(err) {
    next(new Error())
  }
}

export default auth