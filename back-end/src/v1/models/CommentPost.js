import mongoose from 'mongoose'

const CommentPost = new mongoose.Schema({
  user : String,
  post : String,
  comment : String,
  content : String,
  images : Array,
  videos : Array,
}, {timestamps : true})

export default mongoose.model('CommentPosts', CommentPost)