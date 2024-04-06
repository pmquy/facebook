import mongoose from 'mongoose'

const SharePost = new mongoose.Schema({
  user : String,
  post : String,
  content : String,
  images : String,
  videos : String,
}, {timestamps : true})

export default mongoose.model('SharePosts', SharePost)