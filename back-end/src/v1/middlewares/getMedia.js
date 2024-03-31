import fs from 'fs'
import path from 'path'
import Image from '../models/Image.js'
import Video from '../models/Video.js'

import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getImages = async (req, res, next) => {
  if(req.files && req.files.images) {
    req.body.images = await Promise.all(req.files.images.map(e =>
      Image.create({
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
    req.body.videos = await Promise.all(req.files.videos.map(e =>
      Video.create({
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

export { getImages, getImage, getVideos }