const fs = require('fs')
const path = require('path')
const Image = require('../models/Image')

const getImage = async (req, res, next) => {
  try {
    req.body.images = await Promise.all(req.files.map(async e =>
      await Image.create({
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', e.filename)),
        type: 'image/png'
      })
        .then(val => {
          fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', e.filename), err => {})
          return val._id.toString()
        })
    ))
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = getImage