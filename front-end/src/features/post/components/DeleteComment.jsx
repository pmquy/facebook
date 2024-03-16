import { useContext } from "react";
import CommentContext from "../store/CommentContext";
import CommentApi from "../services/CommentApi";
import { useQueryClient } from "react-query";
import {toast} from 'react-toastify'

export default function () {
  const {comment} = useContext(CommentContext)
  const queryClient = useQueryClient()
  const handleDelete = () => {
    CommentApi.deleteById(comment._id)
      .then(() => queryClient.invalidateQueries(['comments', { post: comment.post, comment: comment.comment }]))
      .catch(err => toast(err.message, { type: 'error' }))
  }
  return <div className="btn" onClick={handleDelete}>Xóa</div>
}