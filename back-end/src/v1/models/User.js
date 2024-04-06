import mongoose from 'mongoose'

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
  avatar : String,
}, {timestamps : true})

export default mongoose.model('Users', User)