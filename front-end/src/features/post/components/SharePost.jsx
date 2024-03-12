import { FaShare } from 'react-icons/fa'
import { useQuery } from 'react-query'
import ShareApi from '../services/ShareApi'
import PostContext from "../store/PostContext"
import { useContext } from 'react'

export default function () {
  const { post } = useContext(PostContext)
  const query = useQuery({
    queryKey: ['shareposts', { post: post._id }],
    queryFn: () => ShareApi.get({ post: post._id }),
  })

  if (query.isLoading || query.isError) return <></>

  return <div className="flex gap-2 btn items-center p-2 rounded-lg hover:bg-white_1">
    <FaShare className="w-6 h-6" color="gray" />
    <div>Chia sẻ ({query.data.length})</div>
  </div>
}