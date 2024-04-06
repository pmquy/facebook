import { useContext } from "react";
import PostContext from "../store/PostContext";
import PostApi from "../services/PostApi";
import { useQueryClient } from "react-query";
import {toast} from 'react-toastify'

export default function () {
  const {post} = useContext(PostContext)
  const queryClient = useQueryClient()
  const handleDelete = () => {
    PostApi.deleteById(post._id)
      .then(() => queryClient.invalidateQueries(['posts']))
      .catch(err => toast(err.message, { type: 'error' }))
  }
  return <div className="btn hover:bg-white_2 p-2 rounded-lg" onClick={handleDelete}>Xóa</div>
}