import mongoose from 'mongoose'

const Image = new mongoose.Schema({
  data: Buffer,
  type: String,
})

export default mongoose.model('Images', Image)