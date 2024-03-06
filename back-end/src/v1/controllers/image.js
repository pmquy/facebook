const Image = require('../models/Image')
const {redisClient} = require('../../app')
class Controller {
  getById = async (req, res, next) => {
    const val = await redisClient.get('images' + req.params.id)
    if(val) return res.status(200).send(JSON.parse(val))
    Image.findById(req.params.id) 
      .then(val => {
        res.status(200).send(val)
        redisClient.set('images' + req.params.id, JSON.stringify(val))
      })
      .catch(err => next(err))
  }
}

module.exports = new Controller() 