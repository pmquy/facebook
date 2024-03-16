const fs = require('fs')
const path = require('path')
const Image = require('../models/Image')

const getImages = async (req, res, next) => {
  req.body.images = await Promise.all(req.files.map(async e =>
    await Image.create({
      data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', e.filename)),
      type: 'image/png'
    })
      .then(val => {
        fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', e.filename), err => { })
        return val._id.toString()
      })
  ))
  next()
}

const getImage = async (req, res, next) => {
  if(req.file) {
    req.body[req.file.fieldname] = await Image.create({
      data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', req.file.filename)),
      type: 'image/png'
    })
      .then(val => {
        fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', req.file.filename), err => { })
        return val._id.toString()
      })
  }
  next()
}

module.exports = {getImages, getImage}