import SharePost from '../models/SharePost.js'
import Joi from 'joi'
import File from '../models/File.js'

const creatingPattern = Joi.object({
  content: Joi.string().required(),
  images: Joi.when('content', {
    is : Joi.exist(),
    then : Joi.array().items(Joi.string()).default([]),
    otherwise : Joi.array().items(Joi.string()).min(1)
  }),
  videos : Joi.array().items(Joi.string()),
  post: Joi.string().required()
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  images : Joi.array().items(Joi.string()),
  videos : Joi.array().items(Joi.string()),
}).unknown(false).required()


class Controller {

  get = (req, res, next) =>
    SharePost.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  getById = (req, res, next) =>
    SharePost.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))


  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => SharePost.create({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  deleteById = (req, res, next) =>
    SharePost.findById(req.params.id)
      .then(val => {
        if (val.user == req.user._id) {
          if (val.image) File.findByIdAndDelete(val.image)
          return val.deleteOne()
        }
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  updateById = (req, res, next) =>
    updatingPattern.validateAsync(req.body)
      .then(val => SharePost.findById(req.params.id)
        .then(data => {
          if (val.image) File.findByIdAndDelete(data.image)
          if (data.user == req.user._id) return data.updateOne(val, { new: true })
          throw new Error()
        }))
      .catch(err => next(err))
}

export default new Controller()