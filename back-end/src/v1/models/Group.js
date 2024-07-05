import mongoose from "mongoose";

const Group = new mongoose.Schema({
  avatar: String,
  name: {
    type: String,
    unique: true,
  },
  description: String,
}, { timestamps: true })

export default mongoose.model('Groups', Group)