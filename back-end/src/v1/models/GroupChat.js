const mongoose = require('mongoose')

const GroupChat = new mongoose.Schema({
  name : String,
  users : Array,
})

module.exports = mongoose.model('GroupChats', GroupChat)