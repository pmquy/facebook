import { AiFillLike } from "react-icons/ai"
import LikePostApi from '../services/LikePostApi'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'
import PostContext from "../store/PostContext"
import { useUser } from "../../../hooks/user"

export default function () {
  const { post } = useContext(PostContext)
  const { darkMode } = useContext(CommonContext)
  const {user} = useUser()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['likeposts', { post: post._id }],
    queryFn: () => LikePostApi.get({ post: post._id })
  })

  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  const handleLike = () => {
    if (like)
      LikePostApi.delete({ post: post._id }).then(() => queryClient.invalidateQueries(['likeposts', { post: post._id }]))
    else
      LikePostApi.create({ post: post._id }).then(() => queryClient.invalidateQueries(['likeposts', { post: post._id }]))
  }

  return <div onClick={handleLike} className="flex gap-2 items-center  p-2 rounded-lg btn">
    <AiFillLike className={`w-6 h-6 ${like ? ' animate-like' : ''}`} color={`${like ? '#00ADB5' : `${darkMode ? '#EEEEEE' : '#222831'}`}`} />
    <div>({query?.data?.length})</div>
  </div>
}