import fs from 'fs'
import path from 'path'
import File from '../models/File.js'

import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async function (req, res, next) {
  try {
    if (req.file) {
      req.body[req.file.fieldname] = await File.create({
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', req.file.filename)),
        type: req.file.mimetype,
        name: req.file.originalname
      })
        .then(val => {
          fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', req.file.filename), err => { })
          return val._id.toString()
        })
    } else if (req.files.length) {
      req.body[req.files[0].fieldname] = await Promise.all(req.files.map(e => File.create({
        data: fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', e.filename)),
        type: e.mimetype,
        name: e.originalname
      })
        .then(val => {
          fs.unlink(path.join(__dirname, '..', '..', '..', 'uploads', e.filename), err => { })
          return val._id.toString()
        })
      ))
    } else {
      req.body.files = []
    }
  } catch (err) {
    next(err)
  }

  next()
}