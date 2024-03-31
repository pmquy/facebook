import LikeComment from '../models/LikeComment.js'
import Joi from 'joi'
import {io} from '../../app.js'

const creatingPattern = Joi.object({
  comment: Joi.string().required()
}).unknown(false).required()

class Controller {
  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => LikeComment.create({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  delete = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => LikeComment.deleteOne({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .then(() => io.emit('invalidate', ['likecomments', {comment : req.body.comment}]))
      .catch(err => next(err))

  get = (req, res, next) =>
    LikeComment.find(req.query)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()