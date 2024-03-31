import CommentPost from '../models/CommentPost.js'
import Joi from 'joi'
import Image from '../models/Image.js'
import Notification from '../models/Notification.js'
import PostService from '../services/post.js'
import {io} from '../../app.js'

const creatingPattern = Joi.object({
  content: Joi.string(),
  images: Joi.when('content', {
    is: Joi.exist(),
    then: Joi.array().items(Joi.string()).default([]),
    otherwise: Joi.array().items(Joi.string()).min(1)
  }),
  videos : Joi.array().items(Joi.string()),
  post: Joi.string().required(),
  comment: Joi.string().default(''),
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  images: Joi.array().items(Joi.string()),
  videos : Joi.array().items(Joi.string()),
}).unknown(false).required()

class Controller {

  get = (req, res, next) => {
    CommentPost.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getById = (req, res, next) =>
    CommentPost.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  create = (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => CommentPost.create({ ...val, user: req.user._id }))
      .then(async val => {
        res.status(200).send(val)
        const post = await PostService.getById(val.post)        
        if(post.user != req.user._id) {
          Notification.create({
            content : `${req.user.firstName + ' ' + req.user.lastName} vừa bình luận bài viết của bạn`,
            user : post.user,
            to : '/?open=' + post._id,
            key : JSON.stringify(['comments', { post: val.post, comment: val.comment }])
          })
            .then(() => io.emit('invalidate', ['notifications', post.user]))        
        }
      })   
      .catch(err => next(err))
  }

  deleteById = (req, res, next) =>
    CommentPost.findById(req.params.id)
      .then(async val => {
        if (val.user != req.user._id) throw new Error()
        await Promise.all(val.images.map(e => Image.findByIdAndDelete(e)))
        return val.deleteOne()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  updateById = (req, res, next) =>
    updatingPattern.validateAsync(req.body)
      .then(val => CommentPost.findById(req.params.id)
        .then(async data => {
          await Promise.all(data.images.map(e => Image.findByIdAndDelete(e)))
          if (data.user == req.user._id) return data.updateOne(val, { new: true })
          throw new Error()
        }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()