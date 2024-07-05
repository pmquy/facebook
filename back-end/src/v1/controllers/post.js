import PostService from '../services/post.js'
import GroupService from '../services/group.js'
import Joi from 'joi'

const creatingPattern = Joi.object({
  content: Joi.string(),
  files: Joi.when('content', {
    is: Joi.exist(),
    then: Joi.array().items(Joi.string()).default([]),
    otherwise: Joi.array().items(Joi.string()).min(1).required()
  }),
  group: Joi.string().default('')
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  files: Joi.array().items(Joi.string()),
}).unknown(false).required()

class Controller {
  get = async (req, res, next) => {
    try {
      if(req.query.group) await GroupService.haveRole(req.user._id, req.query.group, 'Member')
      const val = await PostService.get(req.query)
      res.status(200).send(val)
    } catch (error) {
      next(error)      
    }
  }

  create = (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => PostService.create(req.user._id, { ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getById = (req, res, next) => {
    PostService.getById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  deleteById = (req, res, next) => {
    PostService.authorized(req.user._id, req.params.id)
      .then(() => PostService.deleteById(req.params.id))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  updateById = (req, res, next) => {
    PostService.authorized(req.user._id, req.params.id)
      .then(() => updatingPattern.validateAsync(req.body))
      .then(val => PostService.updateById(req.params.id, val))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

export default new Controller()