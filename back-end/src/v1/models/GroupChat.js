import mongoose from 'mongoose'

const GroupChat = new mongoose.Schema({
  name : String,
  users : [String],
})

export default mongoose.model('GroupChats', GroupChat)