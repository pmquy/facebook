const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  user : String,
  content : String,
  images : Array,
  videos : Array,
}, {timestamps : true})

module.exports = mongoose.model('Posts', Post)