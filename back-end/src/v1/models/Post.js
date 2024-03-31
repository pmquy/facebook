import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  user : String,
  content : String,
  images : Array,
  videos : Array,
}, {timestamps : true})

export default mongoose.model('Posts', Post)