import mongoose from "mongoose";

const Group = new mongoose.Schema({
  avatar: {
    type: String,
    default: "67aa0e267ebc18e4f669600a",
  },
  cover: {
    type: String,
    default: "67aa10957ebc18e4f669600b",
  },
  name: {
    type: String,
    unique: true,
  },
  description: String,
}, { timestamps: true })

export default mongoose.model('Groups', Group)