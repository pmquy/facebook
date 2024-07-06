import Post from '../models/Post.js'
import FileService from './file.js'
import GroupService from '../services/group.js'
import UserService from '../services/user.js'
import { redisClient } from '../../app.js'


class Service {
  get = async (query, page, limit) => {
    const posts = await Post.find(query).skip(page * limit).limit(limit).sort({ createdAt: -1 }).select("_id")
    const count = await Post.countDocuments(query)
    const hasMore = count > (page + 1) * limit
    return { posts, hasMore }
  }

  getById = async id => {
    const cache = await redisClient.get('post:' + id)
    if (cache) return JSON.parse(cache)
    const val = (await Post.findById(id)).toObject()
    val.user = await UserService.getById(val.user)
    if(val.group) val.group = await GroupService.getById(val.group)
    redisClient.set('post:' + id, JSON.stringify(val))
    return val
  }

  create = async (user, data) => {
    if (data.group) return GroupService.haveRole(user, data.group, 'Member').then(() => Post.create(data))
    return Post.create(data)
  }

  authorized = async (user, post) =>
    this.getById(post)
      .then(post => {
        if (post.user._id != user && post.type != 'Vote') throw new Error()
      })


  deleteById = async id => {
    const post = await Post.findById(id)
    await Promise.all(post.files.map(e => FileService.deleteById(e)))
    redisClient.del('post:' + id)
    return post.deleteOne()
  }

  updateById = async (id, data) => {
    const post = await Post.findById(id)
    Promise.all(post.files.map(e => FileService.deleteById(e)))
    redisClient.del('post:' + id)
    return post.updateOne(data)
  }
}


export default new Service()