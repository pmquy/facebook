import PostService from '../services/post.js'
import Joi from 'joi'

const creatingPattern = Joi.object({
  content: Joi.string(),
  images: Joi.when('content', {
    is : Joi.exist(),
    then : Joi.array().items(Joi.string()).default([]),
    otherwise : Joi.array().items(Joi.string()).min(1)
  }),
  videos : Joi.array().items(Joi.string()).default([])
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  images: Joi.array().items(Joi.string()),
  videos : Joi.array().items(Joi.string())
}).unknown(false).required()

class Controller {
  get = async (req, res, next) => {
    PostService.get(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = async (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(async val => PostService.create({...val, user : req.user._id}))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getById = async (req, res, next) => {
    PostService.getById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  deleteById = async (req, res, next) => {
    PostService.deleteById(req.user, req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  updateById = async (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => PostService.updateById(req.user, req.params.id, val))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

export default new Controller()