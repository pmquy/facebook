import mongoose from "mongoose"

const Call = new mongoose.Schema({  
  status : Number,
  groupChat : String,
  user : String,
}, {timestamps : true})

export default mongoose.model('Calls', Call)