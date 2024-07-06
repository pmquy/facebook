import mongoose from 'mongoose'

const Post = new mongoose.Schema({
  user : String,
  content : String,
  files: Array,
  group: String,
  type: {
    type: String,
    enum: ['Normal', 'Live', 'Vote']
  },
  status: {
    type: String,
    enum: ['Started', 'Stopped']
  },
  options: [
    new mongoose.Schema({
      content: String,
      votes: [String]
    }, { _id: false })
  ]
}, {timestamps : true})

export default mongoose.model('Posts', Post)