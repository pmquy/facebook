import Group from "../models/Group.js"
import RoleInGroup from "../models/RoleInGroup.js"

class Controller {
  getById = async id => {
    return Group.findById(id)
  }

  get = async query => {
    return Group.find(query)
  }

  create = async (user, data) => {
    return Group.create(data)
      .then(group => RoleInGroup.create({
        user: user,
        group: group._id,
        role: 'Admin'
      }))
  }

  updateById = async (id, data) => {
    return Group.findByIdAndUpdate(id, data, { new: true })
  }

  deleteById = async id => {
    return Group.findByIdAndDelete(id)
  }

  getMembers = async id => {
    return RoleInGroup.find({ group: id })
  }

  request = async (user, group) => {
    return RoleInGroup.create({
      group: group,
      user: user,
      role: 'Requester',
    })
  }

  accept = async (user, group) => {
    return RoleInGroup.findOneAndUpdate({ user: user, group: group, role: 'Requester' }, { role: 'Member' })
  }

  delete = async (user, group) => {
    return RoleInGroup.deleteOne({ user: user, group: group })
  }

  haveRole = async (user, group, role) => {
    return RoleInGroup.findOne({ user: user, group: group})
      .then(val => {
        if((role == 'Member' && val?.role == 'Admin') || val?.role == role) return;
        throw new Error(`You must join the group`)
      })
  }

  getRole = async (user, group) => {
    return RoleInGroup.findOne({ user: user, group: group})
      .then(val => val ? val.role : '')
  }

}


export default new Controller()