import User from '../models/User.js'
import { redisClient } from '../../app.js'
import bcrypt from 'bcrypt'
import Image from '../models/Image.js'

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
    if(user.avatar && data.avatar) await Image.findByIdAndDelete(user.avatar)
    return User.findByIdAndUpdate(id, data, {new : true})
  }

  changePassword = async (user, data) => {
    const val = await User.findById(user._id)
    if (bcrypt.compareSync(data.oldPassword, user.password)) {
      await val.updateOne({ password: data.password }, { new: true })
      return {password : data.password}
    }
    throw new Error()
  }
}


export default new Service()