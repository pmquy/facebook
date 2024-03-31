import mongoose from 'mongoose'

const Friend = new mongoose.Schema({
  sender : String,
  receiver : String,
  status : Number,
}, {timestamps : true})

Friend.index({sender : 1, receiver : 1}, {unique : true})

export default mongoose.model('Friends', Friend)