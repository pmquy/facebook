import Joi from 'joi'
import GroupChat from '../models/GroupChat.js'
import { redisClient } from '../../app.js'

const creatingPattern = Joi.object({
  name: Joi.string().default('Nhóm Chat').required(),
  users: Joi.array().min(1).required()
}).unknown(false).required()

const updatingPattern = Joi.object({
  name: Joi.string(),
  users: Joi.array().min(1)
}).unknown(false).required()

class Controller {
  get = async (req, res, next) => {
    try {
      const query = JSON.parse(req.query.q)
      query.users = { $in: [req.user._id] }
      let data = await GroupChat.find(query)
      data = await Promise.all(data.map(e => redisClient.get(`last_message_${e._id}`)
        .then(val => { return { ...e.toObject(), lastMessage: JSON.parse(val) } }).catch(() => e)))
      data.sort((a, b) => new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt))
      res.status(200).send(data)
    } catch (err) {
      next(err)
    }
  }

  getById = (req, res, next) =>
    GroupChat.findById(req.params.id)
      .then(val => {
        if (val.users.includes(req.user._id)) return res.status(200).send(val)
        throw new Error()
      })
      .catch(err => next(err))

  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => GroupChat.create({ ...val, users: [...val.users, req.user._id] }))
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