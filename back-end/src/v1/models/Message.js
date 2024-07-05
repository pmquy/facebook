import mongoose from 'mongoose'

const Message = new mongoose.Schema({
  type: String,
  files: Array,
  user : String,
  groupChat : String,
}, {timestamps : true, strict : false})

export default mongoose.model('Messages', Message)