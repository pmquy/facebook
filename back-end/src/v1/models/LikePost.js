const mongoose = require('mongoose')

const LikePost = new mongoose.Schema({
  user : String,
  post : String,
}, {timestamps : true})

LikePost.index({user : 1, post : 1}, {unique : true})

module.exports = mongoose.model('LikePosts', LikePost)