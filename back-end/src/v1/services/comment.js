import CommentPost from "../models/CommentPost.js";
import UserService from "./user.js";

class Service {
  findById = async id => {
    const val = (await CommentPost.findById(id)).toObject()
    val.user = await UserService.getById(val.user)
    return val
  }
}

export default new Service()