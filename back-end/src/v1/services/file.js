import File from '../models/File.js'
import Redis from '../configs/init.redis.js'
import { v2 as cloudinary } from 'cloudinary'

class Service {
  getById = async id => {
    const cache = await Redis.client.get('file:' + id)
    if (cache) return JSON.parse(cache)
    const val = (await File.findById(id)).toObject()
    Redis.client.set('file:' + id, JSON.stringify(val))
    return val
  }

  deleteById = async id => {
    const file = await File.findById(id)
    if (file._system) return
    cloudinary.uploader.destroy(file.url.split('/').pop().split('.').shift())
    Redis.client.del('file:' + id)
    return file.deleteOne()
  }
}

export default new Service()