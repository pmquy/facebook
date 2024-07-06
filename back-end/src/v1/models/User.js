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
  avatar: {
    type: String,
    default: "67aa0e267ebc18e4f669600a",
  },
  cover: {
    type: String,
    default: "67aa10957ebc18e4f669600b",
  },
  birthday : String,
  overview : String,
  occupation : String,
  address : String,
  status: String,
}, {timestamps : true})

export default mongoose.model('Users', User)