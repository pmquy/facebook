const mongoose = require('mongoose')

const Friend = new mongoose.Schema({
  sender : String,
  receiver : String,
  status : Number,
}, {timestamps : true})

Friend.index({sender : 1, receiver : 1}, {unique : true})

module.exports = mongoose.model('Friends', Friend)