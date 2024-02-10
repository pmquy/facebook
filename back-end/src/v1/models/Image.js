const mongoose = require('mongoose')

const Image = new mongoose.Schema({
  data: Buffer,
  type: String,
})

module.exports = mongoose.model('Images', Image)