const mongoose = require('mongoose')

const SharePost = new mongoose.Schema({
  user : String,
  post : String,
  content : String,
  images : String,
  videos : String,
}, {timestamps : true})

module.exports = mongoose.model('SharePosts', SharePost)