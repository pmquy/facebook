import { AiFillLike } from "react-icons/ai"
import LikeCommentApi from '../services/LikeCommentApi'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'
import CommentContext from "../store/CommentContext"

export default function () {
  const { user } = useContext(CommonContext)
  const {comment} = useContext(CommentContext)
  const query = useQuery({
    queryKey: ['likecomments', {comment : comment._id}],
    queryFn: () => LikeCommentApi.get({ comment: comment._id })
  })
  const queryClient = useQueryClient()
  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  if (query.isLoading || query.isError) return <div className="flex gap-2 btn items-center p-2 rounded-lg hover:bg-white_1">
    <AiFillLike className={`w-6 h-6`} color={'black'} />
    <div>Thích (0)</div>
  </div>

  const handleLike = () => {
    if (like)
      LikeCommentApi.delete({comment: comment._id,}).then(() => queryClient.invalidateQueries(['likecomments', {comment : comment._id}]))        
    else
      LikeCommentApi.create({comment: comment._id}).then(() => queryClient.invalidateQueries(['likecomments', {comment : comment._id}]))
  }

  return <div onClick={handleLike} className="flex btn gap-2 items-center rounded-lg ">
    <AiFillLike className={`w-6 h-6 ${like ? ' animate-like' : ''}`} color={`${like ? 'red' : 'black'}`} />
    <div className={`${like ? 'text-red_0 font-semibold' : ''}`}>{like ? 'Đã thích' : 'Thích'} ({query.data.length})</div>
  </div>
}