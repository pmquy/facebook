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

  return <div className="flex gap-2 btn hover:bg-grey hover:text-white items-center p-2 rounded-lg hover:bg-white_1">
    <FaShare className="w-6 h-6" color="#00ADB5" />
    <div>({query?.data?.length})</div>
  </div>
}