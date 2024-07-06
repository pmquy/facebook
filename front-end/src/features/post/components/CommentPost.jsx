import { FaComment, FaRegComment } from "react-icons/fa"
import { useQuery } from "react-query"
import CommentApi from '../services/CommentApi'
import { Button } from "@mui/material"

export function CommentPostDetail({ id }) {
  const query = useQuery({
    queryKey: ['commentposts', id],
    queryFn: () => CommentApi.get({ q: { post: id } }),
    initialData: []
  })
  return <div className="flex font-semibold items-center gap-1">
    <FaComment className="w-4 h-4" />
    {query.data.length}
  </div>
}

export function CommentPost({ id }) {
  return <Button startIcon={<FaRegComment/>}>
    <div className="text-sm font-semibold capitalize">Comment</div>
  </Button>
}