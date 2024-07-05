import Joi from 'joi'
import Message from '../models/Message.js'
import GroupChat from '../models/GroupChat.js'
import { io } from '../../app.js'

const creatingPattern = Joi.object({
  type: Joi.string().required(),
  files: Joi.array().items(Joi.string()).default([]),
  groupChat: Joi.string().required(),
  content: Joi.when('type', { is: 'message', then: Joi.string() }),
  options: Joi.when('type', {
    is: 'vote', then: Joi.array().items(Joi.string()).min(1).custom((value, helpers) => {
      return value.map(e => { return { name: e, votes: [] } })
    })
  })
}).unknown(true).required()

const updatingPattern = Joi.object({
  files: Joi.array().items(Joi.string()),
}).unknown(true).required()

class Controller {
  get = (req, res, next) =>
    Message.find(req.query).select('_id')
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  getById = (req, res, next) =>
    Message.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  create = async (req, res, next) => {
    try {
      const val = await creatingPattern.validateAsync(req.body)
      const group = await GroupChat.findById(req.body.groupChat)
      if (!group.users.includes(req.user._id)) throw new Error('You must join this group')
      const data = await Message.create({ ...val, user: req.user._id })
      res.status(200).send(data)
      io.emit('invalidate', ['messages', { groupChat: val.groupChat }])
    } catch (error) {
      next(error)
    }
  }

  updateById = (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => Message.findById(req.params.id))
      .then(val => {
        if (val.user == req.user._id || val.type == 'call') return val.updateOne({ ...req.body })
        throw new Error()
      })
      .then(val => {
        io.emit('invalidate', ['messages', { groupChat: req.body.groupChat }])
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }

  deleteById = (req, res, next) => {
    Message.findById(req.params.id)
      .then(val => {
        if (val.user == req.user._id) return val.deleteOne()
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

export default new Controller()