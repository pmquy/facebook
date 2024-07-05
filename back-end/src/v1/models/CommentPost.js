import mongoose from 'mongoose'

const CommentPost = new mongoose.Schema({
  user : String,
  post : String,
  comment : String,
  content : String,
  files: Array
}, {timestamps : true})

export default mongoose.model('CommentPosts', CommentPost)