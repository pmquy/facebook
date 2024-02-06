const jwt = require('jsonwebtoken')
const User = require('../models/User')

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

module.exports = auth