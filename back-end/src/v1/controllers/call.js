const Call = require('../models/Call')
const Joi = require('joi')
const {io} = require('../../app')

const creatingPattern = Joi.object({  
  groupChat : Joi.string().required()
}).required().unknown(false)

class Controller {
  get = (req, res, next) => {
    Call.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => Call.create({...val, status : 0, user : req.user._id}))
      .then(val => {
        io.emit('invalidate', ['calls', {groupChat : req.body.groupChat}])      
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }

  deleteById = (req, res, next) => {
    Call.findByIdAndUpdate(req.params.id, {
      status : 1
    })
      .then(val => {
        io.emit('invalidate', ['calls', {groupChat : req.body.groupChat}])     
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }
}

module.exports = new Controller()