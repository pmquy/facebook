import mongoose from 'mongoose'

const Story = new mongoose.Schema({
  user : String,
  content : String,
  files: Array
}, {timestamps : true})

export default mongoose.model('Stories', Story)