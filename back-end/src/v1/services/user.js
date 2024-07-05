import User from '../models/User.js'
import { redisClient } from '../../app.js'
import RoleInGroup from '../models/RoleInGroup.js'
import bcrypt from 'bcrypt'
import File from '../services/file.js'

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

  delete = async user => {
    if (user.avatar) await File.deleteById(user.avatar)
    return User.findByIdAndDelete(user._id)
  }

  login = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (bcrypt.compareSync(password, user.password)) return user
    throw new Error()
  }

  update = async (user, data) => {
    if (user.avatar) await File.deleteById(user.avatar)
    return User.findByIdAndUpdate(user._id, data, { new: true })
  }

  changePassword = async (user, val) => {
    if (bcrypt.compareSync(val.oldPassword, user.password)) {
      return User.findByIdAndUpdate(user._id, { password: val.password })
    }
    throw new Error()
  }

  getGroups = async (user) => {
    return RoleInGroup.find({ user: user, $or: [{ role: 'Admin' }, { role: 'Member' }] }).then(v => v.map(e => e.group))
  }
}


export default new Service()