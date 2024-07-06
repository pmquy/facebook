import CommentPost from '../models/CommentPost.js'
import Joi from 'joi'
import File from '../models/File.js'
import Notification from '../models/Notification.js'
import PostService from '../services/post.js'
import CommentService from '../services/comment.js'
import { io } from '../../app.js'

const creatingPattern = Joi.object({
  content: Joi.string(),
  files: Joi.when('content', {
    is: Joi.exist(),
    then: Joi.array().items(Joi.string()).default([]),
    otherwise: Joi.array().items(Joi.string()).min(1).required()
  }),
  post: Joi.string().required(),
  comment: Joi.string().default(''),
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  files: Joi.array().items(Joi.string()),
}).unknown(false).required()

class Controller {

  get = async (req, res, next) => {
    try {
      const page = Number.parseInt(req.query.page)
      const limit = Number.parseInt(req.query.limit)
      const q = JSON.parse(req.query.q)
      const comments = await CommentPost.find(q).skip(page * limit).limit(limit)
      const count = await CommentPost.countDocuments(q)
      const hasMore = count > (page + 1) * limit
      res.status(200).send({ comments, hasMore })
    } catch (error) {
      next(error)
    }
  }

  getById = (req, res, next) =>
    CommentService.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  create = (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => CommentPost.create({ ...val, user: req.user._id }))
      .then(async val => {
        res.status(200).send(val)
        io.to(`post-${val.post}`).emit('new_comment', val)
      })
      .catch(err => next(err))
  }

  deleteById = (req, res, next) =>
    CommentPost.findById(req.params.id)
      .then(async val => {
        if (val.user != req.user._id) throw new Error()
        await Promise.all(val.files.map(e => File.findByIdAndDelete(e)))
        return val.deleteOne()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  updateById = (req, res, next) =>
    updatingPattern.validateAsync(req.body)
      .then(val => CommentPost.findById(req.params.id)
        .then(async data => {
          await Promise.all(val.files.map(e => File.findByIdAndDelete(e)))
          if (data.user == req.user._id) return data.updateOne(val, { new: true })
          throw new Error()
        }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()