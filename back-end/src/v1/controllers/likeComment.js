import LikeComment from '../models/LikeComment.js'
import Joi from 'joi'
import Socket from '../configs/init.socket.js'

const creatingPattern = Joi.object({
  comment: Joi.string().required(),
  type: Joi.string().required()
}).unknown(false).required()


const deletingPattern = Joi.object({
  comment: Joi.string().required()
}).unknown(false).required()

class Controller {
  create = (req, res, next) =>
    creatingPattern.validateAsync(req.body)
      .then(val => LikeComment.create({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  delete = (req, res, next) =>
    deletingPattern.validateAsync(req.body)
      .then(val => LikeComment.deleteOne({ ...val, user: req.user._id }))
      .then(val => res.status(200).send(val))
      .then(() => Socket.io.emit('invalidate', ['likecomments', {comment : req.body.comment}]))
      .catch(err => next(err))

  get = (req, res, next) =>
    LikeComment.find(JSON.parse(req.query.q))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

export default new Controller()