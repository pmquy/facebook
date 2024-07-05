import service from '../services/file.js'

class Controller {
  getById = async (req, res, next) => {
    service.getById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

export default new Controller()