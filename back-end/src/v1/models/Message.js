import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  content : String,
  images : Array,
  videos : Array,
  user : String,
  groupChat : String,
}, {timestamps : true})

export default mongoose.model('Messages', Message)