import mongoose from 'mongoose';

const Event = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  time: String,
  location: String,
  cover: String,
  user: String,
  group: {
    type: String,
    default: ""
  },
  attendees: [String],
})

export default mongoose.model('Events', Event)