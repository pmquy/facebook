const Friend = require('../models/Friend')

class Controller {
  get = async (req, res, next) => {
    Friend.find({ ...req.query, $or: [{ sender: req.user._id }, { receiver: req.user._id }] })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = async (req, res, next) => {
    Friend.create({
      sender: req.user._id,
      receiver: req.params.id,
      status: 0,
    })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  accept = async (req, res, next) => {
    Friend.findOneAndUpdate({
      sender: req.params.id,
      receiver: req.user._id,
    }, { status: 1 })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  decline = async (req, res, next) => {
    Friend.deleteOne({
      sender: req.params.id,
      receiver: req.user._id,
    })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  delete = async (req, res, next) => {
    Friend.deleteOne({
      sender: req.user._id,
      receiver: req.params.id,
    })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

}

module.exports = new Controller()