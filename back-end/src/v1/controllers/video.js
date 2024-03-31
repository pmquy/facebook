import Video from '../models/Video.js'
import {redisClient} from '../../app.js'
class Controller {
  getById = async (req, res, next) => {
    const val = await redisClient.get('videos' + req.params.id)
    if(val) return res.status(200).send(JSON.parse(val))
    Video.findById(req.params.id) 
      .then(async val => {
        redisClient.setEx('videos' + req.params.id, 600, JSON.stringify(val))
        res.status(200).send(val)
      })
      .catch(err => next(err))
  }
}

export default new Controller()