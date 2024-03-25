const mongoose = require('mongoose')

const Message = new mongoose.Schema({
  content : String,
  images : Array,
  videos : Array,
  user : String,
  groupChat : String,
}, {timestamps : true})

module.exports = mongoose.model('Messages', Message)