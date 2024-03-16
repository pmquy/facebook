const User = require('../models/User')
const { redisClient } = require('../../app')
const bcrypt = require('bcrypt')

class Service {
  get = async query => {
    // let val = await redisClient.get('users')
    // if (val) return JSON.parse(val)
    let val = await User.find(query).select('-password -phoneNumber -email')
    // redisClient.set('users', JSON.stringify(val))
    return val
  }

  getById = async id => {
    let val = await redisClient.get('users' + id)
    if (val) return JSON.parse(val)
    val = await User.findById(id).select('-password -phoneNumber -email')
    // redisClient.set('users' + id, JSON.stringify(val))
    return val
  }

  create = async data => {
    const val = await User.create(data)
    // redisClient.get('users')
    //   .then(t => {
    //     t = JSON.parse(t)
    //     redisClient.set('users', [...t, val])
    //   })
    return val
  }

  deleteById = async (user, id) => {
    if (user._id != id) throw new Error()
    redisClient.del('users' + id)
    return User.findByIdAndDelete(id)
  }

  login = async (phoneNumber, password) => {
    const user = await User.findOne({ phoneNumber: phoneNumber })
    if (bcrypt.compareSync(password, user.password)) return user
    throw new Error()
  }

  updateById = async (user, id, data) => {
    if (user._id != id) throw new Error()
    const val = await User.findByIdAndUpdate(id, data)
    // redisClient.set('users' + id, JSON.stringify(val))
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