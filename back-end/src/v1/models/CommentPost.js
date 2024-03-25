const mongoose = require('mongoose')

const CommentPost = new mongoose.Schema({
  user : String,
  post : String,
  comment : String,
  content : String,
  images : Array,
  videos : Array,
}, {timestamps : true})

module.exports = mongoose.model('CommentPosts', CommentPost)