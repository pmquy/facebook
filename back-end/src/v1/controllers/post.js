import PostService from '../services/post.js'
import GroupService from '../services/group.js'
import Joi from 'joi'
import Post from '../models/Post.js'

const creatingPattern = Joi.object({
  content: Joi.string(),
  files: Joi.when('content', {
    is: Joi.exist(),
    then: Joi.array().items(Joi.string()).default([]),
    otherwise: Joi.array().items(Joi.string()).min(1).required()
  }),
  group: Joi.string().default(''),
  type: Joi.string().default('Normal'),
  status: Joi.when('type', {
    is: "Live",
    then: Joi.string().valid('Started').default('Started'),
    otherwise: Joi.forbidden()
  }),
  options: Joi.when('type', {
    is: 'Vote',
    then: Joi.array().items(Joi.object({
      content: Joi.string().required(),
      votes: Joi.array().items(Joi.string()).default([])
    })).min(2).required(),
    otherwise: Joi.forbidden()
  }),
  ref: Joi.object({
    type: Joi.string().valid('Post', 'Event').required(),
    id: Joi.string().required()
  }).unknown(false)
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  files: Joi.array().items(Joi.string()),
  status: Joi.string()
}).unknown(false).required()

class Controller {
  get = async (req, res, next) => {
    try {
      if (req.query.group) await GroupService.haveRole(req.user._id, req.query.group, 'Member')
      const val = await PostService.get(JSON.parse(req.query.q), Number.parseInt(req.query.page), Number.parseInt(req.query.limit))
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

  getById = async (req, res, next) => {
    try {
      const post = await PostService.getById(req.params.id)
      res.status(200).send(post)
    } catch (error) {
      next(error)
    }
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

  voteById = async (req, res, next) => {
    try {
      const post = await PostService.voteById(req.params.id, { ...req.body, user: req.user._id })
      res.status(200).send(post)
    } catch (error) {
      next(error)
    }
  }
}

export default new Controller()