const CommentPost = require('../models/CommentPost')
const Joi = require('joi')
const Image = require('../models/Image')

const creatingPattern = Joi.object({
  content: Joi.string(),
  images: Joi.when('content', {
    is: Joi.exist(),
    then: Joi.array().items(Joi.string()).default([]),
    otherwise: Joi.array().items(Joi.string()).min(1)
  }),
  post: Joi.string().required(),
  comment: Joi.string().default(''),
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  images: Joi.array().items(Joi.string()),
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
      .then(val => res.status(200).send(val))
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

module.exports = new Controller()