const mongoose = require('mongoose')

const CommentPost = new mongoose.Schema({
  user : String,
  post : String,
  comment : String,
  content : String,
  image : String,
}, {timestamps : true})

module.exports = mongoose.model('CommentPosts', CommentPost)