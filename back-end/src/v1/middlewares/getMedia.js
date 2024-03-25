const fs = require('fs')
const path = require('path')
const Image = require('../models/Image')
const Video = require('../models/Video')

const getImages = async (req, res, next) => {
  if(req.files && req.files.images) {
    req.body.images = await Promise.all(req.files.images.map(async e =>
      await Image.create({
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', e.filename)),
        type: 'image/png'
      })
        .then(val => {
          fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', e.filename), err => { })
          return val._id.toString()
        })
    ))
  }
  next()
}

const getImage = async (req, res, next) => {
  if (req.file) {
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

const getVideos = async (req, res, next) => {
  if(req.files && req.files.videos) {
    req.body.videos = await Promise.all(req.files.videos.map(async e =>
      await Video.create({
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', e.filename)),
        type: 'video/mp4'
      })
        .then(val => {
          fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', e.filename), err => { })
          return val._id.toString()
        })
    ))
  }
  next()
}

module.exports = { getImages, getImage, getVideos }