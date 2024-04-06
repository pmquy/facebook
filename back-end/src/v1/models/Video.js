import mongoose from 'mongoose'

const Video = new mongoose.Schema({
  data: Buffer,
  type: String,
})

export default mongoose.model('Videos', Video)