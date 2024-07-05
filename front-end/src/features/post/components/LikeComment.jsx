import { AiFillLike } from "react-icons/ai"
import LikeCommentApi from '../services/LikeCommentApi'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'
import CommentContext from "../store/CommentContext"
import { useUser } from "../../../hooks/user"

export default function () {
  const { user } = useUser()
  const { comment } = useContext(CommentContext)
  const query = useQuery({
    queryKey: ['likecomments', { comment: comment._id }],
    queryFn: () => LikeCommentApi.get({ comment: comment._id })
  })
  const queryClient = useQueryClient()
  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  const handleLike = () => {
    if (like)
      LikeCommentApi.delete({ comment: comment._id, }).then(() => queryClient.invalidateQueries(['likecomments', { comment: comment._id }]))
    else
      LikeCommentApi.create({ comment: comment._id }).then(() => queryClient.invalidateQueries(['likecomments', { comment: comment._id }]))
  }

  return <div onClick={handleLike} className="flex gap-1 hover:bg-grey p-1 rounded-lg items-center btn">
    <AiFillLike className={`w-4 h-4 ${like ? ' animate-like' : ''}`} color={`${like ? '#222831' : '#EEEEEE'}`} />
    <div>({query?.data?.length})</div>
  </div>
}