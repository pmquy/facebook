import Image from '../models/Image.js'
import {redisClient} from '../../app.js'
class Controller {
  getById = async (req, res, next) => {
    const val = await redisClient.get('images' + req.params.id)
    if(val) return res.status(200).send(JSON.parse(val))
    Image.findById(req.params.id) 
      .then(async val => {
        redisClient.setEx('images' + req.params.id, 600, JSON.stringify(val))
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }
}

export default new Controller()