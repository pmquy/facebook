import File from '../models/File.js'
import { redisClient } from '../../app.js'

class Service {
  getById = async id => {
    const val = await redisClient.get('file' + id)
    if (val) return JSON.parse(val)
    File.findById(id)
      .then(async val => {
        redisClient.set('file' + id, JSON.stringify(val))
        return val;
      })
  }

  deleteById = async id => {
    File.findByIdAndDelete(id)
      .then(async val => {
        redisClient.del('file' + id)
        return val;
      })
  }
}

export default new Service()