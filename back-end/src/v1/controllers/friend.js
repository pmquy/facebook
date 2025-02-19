import Friend from '../models/Friend.js'
import User from '../models/User.js'
import FriendService from '../services/friend.js'

class Controller {
  async get (req, res, next) {
    try {
      const page = req.query.page ? Number.parseInt(req.query.page) : 0
      const limit = req.query.limit ? Number.parseInt(req.query.limit) : 10
      const query = req.query.q ? JSON.parse(req.query.q) : {}
      query.$or = [{ sender: req.user._id }, { receiver: req.user._id }]
      const friends = await Friend.aggregate([
        {
          $match: query
        },
        {
          $skip: page * limit,
        },
        {
          $limit: limit
        }
      ])
      res.status(200).json({
        friends,
        hasMore: await Friend.countDocuments(query) > (page + 1) * limit
      })
    } catch (err) {
      next(err)
    }
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