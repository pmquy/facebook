import Friend from '../models/Friend.js'
import User from '../models/User.js'
import FriendService from '../services/friend.js'

class Controller {
  get = (req, res, next) => {
    FriendService.get({ ...JSON.parse(req.query.q), $or: [{ sender: req.user._id }, { receiver: req.user._id }] })
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
    FriendService.create({
      sender: req.user._id,
      receiver: req.params.id,
    })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  accept = (req, res, next) => {
    FriendService.accept({ sender: req.params.id, receiver: req.user._id, })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  cancel = async (req, res, next) => {
    try {
      await FriendService.deleteOne({
        sender: req.user._id,
        receiver: req.params.id,
      })
      await FriendService.deleteOne({
        sender: req.params.id,
        receiver: req.user._id,
      })
      res.status(200).send("OK")
    } catch(error) {
      next(error)
    }
  }

}

export default new Controller()