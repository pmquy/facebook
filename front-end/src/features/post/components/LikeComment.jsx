import { AiFillLike } from "react-icons/ai"
import LikeCommentApi from '../services/LikeCommentApi'
import { useQuery } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'

export default function ({ comment }) {
  const { user } = useContext(CommonContext)  
  const query = useQuery({
    queryKey: ['likecomments', {comment : comment}],
    queryFn: () => LikeCommentApi.get({ comment: comment })
  })

  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  if (query.isLoading || query.isError) return <></>

  const handleLike = () => {
    if (like) {
      LikeCommentApi.delete({
        comment: comment,
      })        
    } else {
      LikeCommentApi.create({
        comment: comment,
      })        
    }
  }

  return <div onClick={handleLike} className="flex gap-2 items-center cursor-pointer rounded-lg ">
    <AiFillLike className={`w-6 h-6 ${like ? ' animate-like' : ''}`} color={`${like ? 'red' : 'gray'}`} />
    <div className={`${like ? 'text-red_0 font-semibold' : ''}`}>{like ? 'Đã thích' : 'Thích'} ({query.data.length})</div>
  </div>
}