const {io} = require('../../app')
const LikePost = require('../models/LikePost')
const Joi = require('joi')
const Notification = require('../models/Notification')
const PostService = require('../services/post')
const UserService = require('../services/user')

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
        Notification.create({
          content : `${req.user.firstName + ' ' + req.user.lastName} vừa thích bài viết của bạn`,
          user : post.user,
        })
          .then(() => io.emit('invalidate', ['notifications', post.user]))        
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

module.exports = new Controller()