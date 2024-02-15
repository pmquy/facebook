const mongoose = require('mongoose')

const Message = new mongoose.Schema({
  content : String,
  image : String,
  user : String,
  groupChat : String,
})

module.exports = mongoose.model('Messages', Message)