import mongoose from 'mongoose'

const Notification = new mongoose.Schema({
  user : String,
  content : String,
  to : String,
  key : String,
}, {timestamps : true})

export default mongoose.model('Notifications', Notification)
