import mongoose from 'mongoose'

const File = new mongoose.Schema({
  data: Buffer,
  type: String,
  name: String
})

export default mongoose.model('Files', File)