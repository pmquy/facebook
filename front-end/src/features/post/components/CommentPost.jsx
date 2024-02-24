import { FaComment } from "react-icons/fa"
import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query"

export default function ({ post }) {
  const query = useQuery({
    queryKey: ['comments', {post : post}],
    queryFn: () => CommentApi.get({post : post})
  })

  if (query.isError || query.isLoading) return <></>
  
  return <div className="flex gap-2 items-center p-2 cursor-pointer rounded-lg hover:bg-white_1">
    <FaComment className="w-6 h-6" color="gray" />
    <div>Bình luận ({query.data.length})</div>
  </div>
}