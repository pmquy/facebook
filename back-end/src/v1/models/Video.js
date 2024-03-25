const mongoose = require('mongoose')

const Video = new mongoose.Schema({
  data: Buffer,
  type: String,
})

module.exports = mongoose.model('Videos', Video)