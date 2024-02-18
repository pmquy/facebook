const LikePost = require('../models/LikePost')
const Joi = require('joi')

const creatingPattern = Joi.object({
  post: Joi.string().required()
}).unknown(false).required()

class Controller {
  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => LikePost.create({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
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