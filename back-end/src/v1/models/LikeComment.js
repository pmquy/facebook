import mongoose from 'mongoose'

const LikeComment = new mongoose.Schema({
  user : String,
  comment : String,
}, {timestamps : true})

LikeComment.index({user : 1, comment : 1}, {unique : true})

export default mongoose.model('LikeComments', LikeComment)