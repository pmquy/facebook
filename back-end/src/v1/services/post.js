import Post from '../models/Post.js'
import FileService from './file.js'
import GroupService from '../services/group.js'
import { redisClient } from '../../app.js'

class Service {
  get = async query => {
    return Post.find(query).select(['_id'])
  }

  getById = async id => {
    const val = await redisClient.get('post' + id)
    if (val) return JSON.parse(val)
    return Post.findById(id)
      .then(val => {
        redisClient.set('post' + id, JSON.stringify(val))
        return val
      })
  }

  create = async (user, data) => {
    if(data.group) {
      return GroupService.haveRole(user, data.group, 'Member')
        .then(() => Post.create(data))
    } else {
      return Post.create(data)
    }
  }

  authorized = async (user, post) =>
    this.getById(post)
      .then(post => {
        if (post.user != user) throw new Error()
      })


  deleteById = async id => {
    const post = await Post.findById(id)
    await Promise.all(post.files.map(e => FileService.deleteById(e)))
    redisClient.del('post' + id)
    return post.deleteOne()
  }

  updateById = async (id, data) => {
    const post = await Post.findById(id)
    await Promise.all(post.files.map(e => FileService.deleteById(e)))
    redisClient.del('post' + id)
    return post.updateOne(data)
  }
}


export default new Service()