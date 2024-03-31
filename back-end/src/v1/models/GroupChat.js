import mongoose from 'mongoose'

const GroupChat = new mongoose.Schema({
  name : String,
  users : Array,
})

export default mongoose.model('GroupChats', GroupChat)