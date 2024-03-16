const User = require('../models/User')
const { redisClient } = require('../../app')
const bcrypt = require('bcrypt')
const Image = require('../models/Image')

class Service {
  get = async query => {
    const val = await User.find(query).select('-password -phoneNumber -email')
    return val
  }

  getById = async id => {
    const val = await User.findById(id).select('-password -phoneNumber -email')
    return val
  }

  create = async data => {
    const val = await User.create(data)
    return val
  }

  deleteById = async (user, id) => {
    if (user._id != id) throw new Error()
    if(user.avatar) await Image.findByIdAndDelete(user.avatar)
    return User.findByIdAndDelete(id)
  }

  login = async (phoneNumber, password) => {
    const user = await User.findOne({ phoneNumber: phoneNumber })
    if (bcrypt.compareSync(password, user.password)) return user
    throw new Error()
  }

  updateById = async (user, id, data) => {
    if (user._id != id) throw new Error()
    if(user.avatar) await Image.findByIdAndDelete(user.avatar)
    const val = await User.findByIdAndUpdate(id, data, {new : true})
    return val
  }

  changePasswordById = async (user, id, data) => {
    if (user._id != id) throw new Error()
    const val = await User.findById(req.params.id)
    if (bcrypt.compareSync(data.oldPassword, user.password))
      return val.updateOne({ password: data.password }, { new: true })
    throw new Error()
  }
}


module.exports = new Service()