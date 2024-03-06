const mongoose = require('mongoose')

const Message = new mongoose.Schema({
  content : String,
  image : String,
  user : String,
  groupChat : String,
}, {timestamps : true})

module.exports = mongoose.model('Messages', Message)