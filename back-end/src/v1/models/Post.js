import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  user : String,
  content : String,
  files: Array,
  group: String
}, {timestamps : true})

export default mongoose.model('Posts', Post)