const mongoose = require('mongoose')

const LikeComment = new mongoose.Schema({
  user : String,
  comment : String,
}, {timestamps : true})

LikeComment.index({user : 1, comment : 1}, {unique : true})

module.exports = mongoose.model('LikeComments', LikeComment)