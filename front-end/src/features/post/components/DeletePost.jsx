import { useContext } from "react";
import { toast } from 'react-toastify';
import PostApi from "../services/PostApi";
import PostContext from "../store/PostContext";

export default function () {
  const {post} = useContext(PostContext)
  const handleDelete = () => {
    PostApi.deleteById(post._id)
      .then(() => {})
      .catch(err => toast(err.message, { type: 'error' }))
  }
  return <div className="p-2 btn" onClick={handleDelete}>Xóa</div>
}