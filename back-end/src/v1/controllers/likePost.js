import {io} from '../../app.js'
import LikePost from '../models/LikePost.js'
import Joi from 'joi'
import Notification from '../models/Notification.js'
import PostService from '../services/post.js'

const creatingPattern = Joi.object({
  post: Joi.string().required()
}).unknown(false).required()

class Controller {
  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => LikePost.create({ ...val, user: req.user._id }))
      .then(async val => {
        res.status(200).send(val)
        const post = await PostService.getById(val.post)        
        if(post.user != req.user._id) {
          Notification.create({
            content : `${req.user.firstName + ' ' + req.user.lastName} vừa thích bài viết của bạn`,
            user : post.user,
            to : '/posts/' + post._id,
            key : JSON.stringify(['likeposts', { post: val.post }])
          })
            .then(() => io.emit('invalidate', ['notifications', post.user]))        
        }
      })            
      .catch(err => next(err))

  delete = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => LikePost.deleteOne({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  get = (req, res, next) =>
    LikePost.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()