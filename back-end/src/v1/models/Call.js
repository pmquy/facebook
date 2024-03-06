const mongoose = require('mongoose')

const Call = new mongoose.Schema({  
  status : Number,
  groupChat : String,
  user : String,
}, {timestamps : true})

module.exports = mongoose.model('Calls', Call)