const mongoose = require('mongoose')

const Notification = new mongoose.Schema({
  user : String,
  content : String,
  to : String,
  key : String,
}, {timestamps : true})

module.exports = mongoose.model('Notifications', Notification)
