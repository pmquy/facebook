import { FaComment } from "react-icons/fa"
import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query"
import { useContext } from "react"
import PostContext from "../store/PostContext"

export default function () {
  const { setCreate, post } = useContext(PostContext)
  const query = useQuery({
    queryKey: ['comments', { post: post._id }],
    queryFn: () => CommentApi.get({ post: post._id })
  })

  if (query.isError || query.isLoading) return <div className="flex animate-pulse gap-2 btn items-center p-2 rounded-lg hover:bg-white_1">
    <FaComment className="w-6 h-6" color="black" />
    <div>Bình luận</div>
  </div>

  return <div onClick={() => setCreate(true)} className="flex gap-2 btn items-center p-2 rounded-lg hover:bg-white_1">
    <FaComment className="w-6 h-6" color="black" />
    <div>Bình luận ({query.data.length})</div>
  </div>
}