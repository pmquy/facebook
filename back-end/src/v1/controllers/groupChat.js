import Joi from 'joi'
import GroupChat from '../models/GroupChat.js'

const creatingPattern = Joi.object({
  name: Joi.string().default('Nhóm Chat').required(),
  users: Joi.array().min(2).required()
}).unknown(false).required()

const updatingPattern = Joi.object({
  name: Joi.string(),
  users: Joi.array().min(2)
}).unknown(false).required()

class Controller {
  get = (req, res, next) =>
    GroupChat.find(req.query)
      .then(val => val.filter(e => e.users.includes(req.user._id)))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  getById = (req, res, next) =>
    GroupChat.findById(req.params.id)
      .then(val => {
        if(val.users.includes(req.user._id)) return res.status(200).send(val)
        throw new Error()
      })      
      .catch(err => next(err))

  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => GroupChat.create(val))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  deleteById = (req, res, next) =>
    GroupChat.findById(req.params.id)
      .then(val => {
        if (val.users.includes(req.user._id)) return val.deleteOne()
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  updateById = (req, res, next) =>
    updatingPattern.validateAsync(req.body)
      .then(val => GroupChat.findById(req.params.id)
        .then(data => {
          if (data.users.includes(req.user._id)) return data.updateOne(val, { new: true })
          throw new Error()
        })
      )
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()