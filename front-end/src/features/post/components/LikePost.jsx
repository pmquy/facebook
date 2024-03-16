import { AiFillLike } from "react-icons/ai"
import LikePostApi from '../services/LikePostApi'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'
import PostContext from "../store/PostContext"

export default function () {
  const { post } = useContext(PostContext)
  const { user } = useContext(CommonContext)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['likeposts', { post: post._id }],
    queryFn: () => LikePostApi.get({ post: post._id })
  })

  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  if (query.isLoading || query.isError) return <div className="flex gap-2 btn items-center p-2 rounded-lg hover:bg-white_1">
    <AiFillLike className={`w-6 h-6`} color={'gray'} />
    <div>Thích (0)</div>
  </div>

  const handleLike = () => {
    if (like)
      LikePostApi.delete({ post: post._id }).then(() => queryClient.invalidateQueries(['likeposts', { post: post._id }]))
    else
      LikePostApi.create({ post: post._id }).then(() => queryClient.invalidateQueries(['likeposts', { post: post._id }]))
  }

  return <div onClick={handleLike} className="flex gap-2 btn items-center p-2 rounded-lg hover:bg-white_1">
    <AiFillLike className={`w-6 h-6 ${like ? ' animate-like' : ''}`} color={`${like ? 'red' : 'gray'}`} />
    <div className={`${like ? 'text-red_0 font-semibold' : ''}`}>{like ? 'Đã thích' : 'Thích'} ({query.data.length})</div>
  </div>
}