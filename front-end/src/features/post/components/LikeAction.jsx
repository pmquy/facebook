import { AiFillLike } from "react-icons/ai"
import LikeApi from '../services/LikeApi'
import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from "react"
import CommonContext from '../../../store/CommonContext'

export default function ({ id }) {
  const { user } = useContext(CommonContext)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['likeposts', id],
    queryFn: () => LikeApi.get({ post: id })
  })

  const like = useMemo(() => {
    if (query.isLoading || query.isError) return
    return query.data.some(e => e.user == user._id)
  }, [query.data])

  if (query.isLoading || query.isError) return <></>

  const handleLike = () => {
    if (like) {
      LikeApi.delete({
        post: id,
      })
        .then(() => queryClient.invalidateQueries(['likeposts', id]))
    } else {
      LikeApi.create({
        post: id,
      })
        .then(() => queryClient.invalidateQueries(['likeposts', id]))
    }
  }

  return <div onClick={handleLike} className="flex gap-2 items-center p-2 cursor-pointer rounded-lg hover:bg-white_1">
    <AiFillLike className="w-6 h-6" color={`${like ? 'red' : 'gray'}`} />
    <div className={`${like ? 'text-red_0 font-semibold' : ''}`}>{like ? 'Đã thích' : 'Thích'} ({query.data.length})</div>
  </div>
}