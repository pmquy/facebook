import mongoose from 'mongoose'

const RoleInGroup = new mongoose.Schema({
  user: String,
  group: String,
  role: {
    type: String,
    enum: ['Admin', 'Member', 'Requester'],
  }
}, {timestamps : true})

RoleInGroup.index({user : 1, group: 1}, {unique : true})



export default mongoose.model('RoleInGroups', RoleInGroup)