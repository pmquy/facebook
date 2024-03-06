const Post = require('../models/Post')
const Image = require('../models/Image')
const {redisClient} = require('../../app')

class Service {
  get = async query => Post.find(query)

  getById = async id => {
    let val = await redisClient.get('posts' + id)
    if(val) return JSON.parse(val)
    val = await Post.findById(id)
    redisClient.set('posts' + id, JSON.stringify(val))
    return val
  }

  create = async data => Post.create(data)

  deleteById = async (user, id) => {
    const post = await Post.findById(id)
    if(post.user != user._id) throw new Error()
    if(post.image) Image.findByIdAndDelete(post.image)
    redisClient.del('posts' + id)
    return post.deleteOne()
  }

  updateById = async (user, id, data) => {
    const post = await Post.findById(id)
    if(post.user != user._id) throw new Error()
    if(post.image && data.image) Image.findByIdAndDelete(post.image)
    const val = await post.updateOne(data, {new : true})
    redisClient.set('posts' + id, JSON.stringify(val))
    return val
  }
}


module.exports = new Service()