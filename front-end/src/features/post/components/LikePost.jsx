import { AiFillLike } from "react-icons/ai"
import LikePostApi from '../services/LikePostApi'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'

export default function ({ post }) {
  const { user } = useContext(CommonContext)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['likeposts', {post : post}],
    queryFn: () => LikePostApi.get({ post: post })
  })

  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  if (query.isLoading || query.isError) return <></>

  const handleLike = () => {
    if (like) {
      LikePostApi.delete({
        post: post,
      })
        .then(() => queryClient.invalidateQueries(['likeposts', {post : post}]))
    } else {
      LikePostApi.create({
        post: post,
      })
        .then(() => queryClient.invalidateQueries(['likeposts', {post : post}]))
    }
  }

  return <div onClick={handleLike} className="flex gap-2 items-center p-2 cursor-pointer rounded-lg hover:bg-white_1">
    <AiFillLike className={`w-6 h-6 ${like ? ' animate-like' : ''}`} color={`${like ? 'red' : 'gray'}`} />
    <div className={`${like ? 'text-red_0 font-semibold' : ''}`}>{like ? 'Đã thích' : 'Thích'} ({query.data.length})</div>
  </div>
}