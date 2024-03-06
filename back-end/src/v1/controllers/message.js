const Joi = require('joi')
const Message = require('../models/Message')
const GroupChat = require('../models/GroupChat')
const {io} = require('../../app')

const creatingPattern = Joi.object({
  content : Joi.string().required(),
  image : Joi.string(),
  groupChat : Joi.string().required(),
}).unknown(false).required()

const updatingPattern = Joi.object({
  content : Joi.string(),
  image : Joi.string(),  
}).unknown(false).required()

class Controller {
  get = (req, res, next) => 
    Message.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  
  create = (req, res, next) => {    
    creatingPattern.validateAsync(req.body)
      .then(val => GroupChat.findById(req.body.groupChat))
      .then(val => {
        if(val.users.includes(req.user._id)) return Message.create({...req.body, user : req.user._id})
        throw new Error()
      })
      .then(val => {
        res.status(200).send(val)
        io.emit('invalidate', ['messages', {groupChat : req.body.groupChat}])
      })
      .catch(err => next(err))
  }

  updateById = (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => Message.findById(req.params.id))
      .then(val => {
        if(val.user == req.user._id) return val.updateOne(req.body, {new : true})
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  deleteById = (req, res, next) => {
    Message.findById(req.params.id)
      .then(val => {
        if(val.user == req.user._id) return val.deleteOne()
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

module.exports = new Controller()