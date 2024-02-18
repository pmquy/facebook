const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  user : String,
  content : String,
  image : String,
}, {timestamps : true})

module.exports = mongoose.model('Posts', Post)