const Image = require('../models/Image')
const Post = require('../models/Post')
const Joi = require('joi')

const creatingPattern = Joi.object({
  content: Joi.string().required(),
  image: Joi.string()
}).unknown(false).required()

const updatingPattern = Joi.object({
  content: Joi.string(),
  image: Joi.string()
}).unknown(false).required()

class Controller {
  get = async (req, res, next) => {
    Post.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = async (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(async val => Post.create({...val, user : req.user._id}))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getById = async (req, res, next) => {
    Post.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  deleteById = async (req, res, next) => {
    Post.findById(req.params.id)
      .then(val => {
        if (val.user == req.user._id) {
          if(val.image) Image.findByIdAndDelete(val.image)
          return val.deleteOne()
        }
        throw new Error()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  updateById = async (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => Post.findById(req.params.id)
        .then(data => {
          if(val.image) Image.findByIdAndDelete(data.image)
          if (data.user == req.user._id) return data.updateOne(val, { new: true })
          throw new Error()
        })
      )
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

module.exports = new Controller() 