import Post from '../models/Post.js'
import Image from '../models/Image.js'
import {redisClient} from '../../app.js'

class Service {
  get = async query => Post.find(query)
  getById = async id => {
    // let val = await redisClient.get('posts' + id)
    // if(val) return JSON.parse(val)
    const val = await Post.findById(id)
    // redisClient.set('posts' + id, JSON.stringify(val))
    return val
  }

  create = async data => Post.create(data)

  deleteById = async (user, id) => {
    const post = await Post.findById(id)
    if(post.user != user._id) throw new Error()
    await Promise.all(post.images.map(e => Image.findByIdAndDelete(e)))
    // redisClient.del('posts' + id)
    return post.deleteOne()
  }

  updateById = async (user, id, data) => {
    const post = await Post.findById(id)
    if(post.user != user._id) throw new Error()
    await Promise.all(post.images.map(e => Image.findByIdAndDelete(e)))
    const val = await post.updateOne(data, {new : true})
    // redisClient.del('posts' + id)
    return val
  }
}


export default new Service()