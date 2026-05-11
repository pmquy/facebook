import mongoose from 'mongoose'
import Message from './Message.js'

const GroupChat = new mongoose.Schema({
  name : String,
  users : [String],
  lastMessage : String
}, { timestamps: true })

export default mongoose.model('GroupChats', GroupChat)