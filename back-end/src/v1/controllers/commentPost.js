const CommentPost = require('../models/CommentPost')
const Joi = require('joi')
const Image = require('../models/Image')

const creatingPattern = Joi.object({
  content: Joi.string().required(),
  image: Joi.string(),
  post: Joi.string().required()
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  image: Joi.string(),
}).unknown(false).required()

class Controller {

  get = (req, res, next) =>
    CommentPost.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

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
      .then(val => {
        if (val.user == req.user._id) {
          if (val.image) Image.findByIdAndDelete(val.image)
          return val.deleteOne()
        }
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  updateById = (req, res, next) =>
    updatingPattern.validateAsync(req.body)
      .then(val => CommentPost.findById(req.params.id)
        .then(data => {
          if (val.image) Image.findByIdAndDelete(data.image)
          if (data.user == req.user._id) return data.updateOne(val, { new: true })
          throw new Error()
        }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

module.exports = new Controller()