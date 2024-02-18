const Notifaction = require('../models/Notification')

class Controller {
  get = (req, res, next) => 
    Notifaction.find({...req.query, user : req.user._id})
      .then(val => res.status(200).send(val))
      .catch(err => next(err))

  deleteById = (req, res, next) => 
    Notifaction.findById(req.params.id)
      .then(val => {
        if(val.user == req.user._id) return val.deleteOne()
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
}

module.exports = new Controller()