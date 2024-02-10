const Image = require('../models/Image')
class Controller {
  getById = (req, res, next) => {
    Image.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

module.exports = new Controller()