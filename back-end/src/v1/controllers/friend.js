import Friend from '../models/Friend.js'
import User from '../models/User.js'

class Controller {
  get = (req, res, next) => {
    Friend.find({ ...JSON.parse(req.query.q), $or: [{ sender: req.user._id }, { receiver: req.user._id }] })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getSuggested = async (req, res, next) => {
    const friends = await Friend.find({ $or: [{ sender: req.user._id }, { receiver: req.user._id }] })
    const ids = friends.map(e => e.sender == req.user._id ? e.receiver : e.sender)
    ids.push(req.user._id)
    const users = await User.find({ _id: { $nin: ids } }).select('_id')
    res.status(200).send(users)
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