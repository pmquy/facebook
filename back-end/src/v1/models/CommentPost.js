const mongoose = require('mongoose')

const CommentPost = new mongoose.Schema({
  user : String,
  post : String,
  comment : String,
  content : String,
  images : Array,
}, {timestamps : true})

module.exports = mongoose.model('CommentPosts', CommentPost)