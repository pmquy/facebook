const mongoose = require('mongoose')

const Friend = new mongoose.Schema({
  sender : String,
  receiver : String,
  status : Number,
}, {timestamps : true})

module.exports = mongoose.model('Friends', Friend)