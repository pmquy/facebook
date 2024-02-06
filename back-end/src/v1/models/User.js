const mongoose = require('mongoose')

const User = new mongoose.Schema({
  phoneNumber : {
    type : String,
    unique : true,
  },
  email : {
    type : String,
    unique : true,
  },
  password : String,
  firstName : String,
  lastName : String,
}, {timestamps : true})

module.exports = mongoose.model('Users', User)