import {io, redisClient} from '../../app.js'
import CaroGame from '../models/CaroGame.js'
import Joi from 'joi'
const m = 30, n = 30, w = 5;


const creatingPattern = Joi.object({
  to: Joi.string().required(),
}).required().unknown(false)


const updatingPattern = Joi.object({
  i: Joi.number().min(0).max(m).required(),
  j: Joi.number().min(0).max(n).required(),
})

const check = (arr) => {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const temp = arr[i][j]
      if (!temp) continue
      if (i + w <= m) {
        let check = true
        const a = JSON.parse(JSON.stringify(arr))
        for (let t = 0; t < w; t++) {
          if (arr[i + t][j] != temp) {
            check = false
            break
          }
          a[i + t][j] = 0
        }
        if (check) return a
      }
      if (j + w <= n) {
        let check = true
        const a = JSON.parse(JSON.stringify(arr))
        for (let t = 0; t < w; t++) {
          if (arr[i][j + t] != temp) {
            check = false
            break
          }
          a[i][j + t] = 1
        }
        if (check) return a
      }
      if (j + w <= n && i + w <= m) {
        let check = true
        const a = JSON.parse(JSON.stringify(arr))
        for (let t = 0; t < w; t++) {
          if (arr[i + t][j + t] != temp) {
            check = false
            break
          }
          a[i + t][j + t] = 2
        }
        if (check) return a
      }
      if (j + w <= n && i >= w - 1) {
        let check = true
        const a = JSON.parse(JSON.stringify(arr))
        for (let t = 0; t < w; t++) {
          if (arr[i - t][j + t] != temp) {
            check = false
            break
          }
          a[i - t][j + t] = 3
        }
        if (check) return a
      }
    }
  }
}

class Controller {

  get = (req, res, next) => {
    CaroGame.find({ ...req.query, $or: [{ from: req.user._id }, { to: req.user._id }] })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  getById = (req, res, next) => {
    CaroGame.findById(req.params.id)
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }

  create = (req, res, next) => {
    creatingPattern.validateAsync(req.body)
      .then(val => CaroGame.create({
        ...val,
        from: req.user._id,
        turn: req.user._id,
        content: new Array(m).fill(new Array(n)),
      }))
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }


  updateById = (req, res, next) => {
    updatingPattern.validateAsync(req.body)
      .then(val => CaroGame.findById(req.params.id))
      .then(val => {
        if (val.result.length) throw new Error('Trò chơi đã kết thúc')
        if (val.turn != req.user._id) throw new Error('Lượt của đối thủ')
        if (val.content[req.body.i][req.body.j]) throw new Error('Nước đi không hợp lệ')
        val.content[req.body.i][req.body.j] = req.user._id == val.from ? 'x' : 'o'
        io.emit('invalidate', ['carogame', val._id.toString()])        
        return val.updateOne({
          content: val.content,
          turn: req.user._id == val.from ? val.to : val.from,
          result: check(val.content)
        })
      })
      .then(val => res.status(200).send(val))
      .catch(err => next(err))
  }
}

export default new Controller()