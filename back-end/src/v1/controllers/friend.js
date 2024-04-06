import Friend from '../models/Friend.js'

class Controller {
  get = (req, res, next) => {
    Friend.find({ ...req.query, $or: [{ sender: req.user._id }, { receiver: req.user._id }] })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = (req, res, next) => {
    Friend.create({
      sender: req.user._id,
      receiver: req.params.id,
      status: 0,
    })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  accept = (req, res, next) => {
    Friend.findOneAndUpdate({
      sender: req.params.id,
      receiver: req.user._id,
      status: 0,
    }, { status: 1 })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  cancel = (req, res, next) => {
    Friend.deleteMany({
      $or: [{
        sender: req.user._id,
        receiver: req.params.id,
      }, {
        sender: req.params.id,
        receiver: req.user._id,
      }]
    })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

}

export default new Controller()