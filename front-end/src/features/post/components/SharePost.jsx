import { FaShare } from 'react-icons/fa'
import { useQuery } from 'react-query'
import ShareApi from '../services/ShareApi'

export default function ({ post }) {  
  const query = useQuery({
    queryKey: ['shareposts', {post : post}],
    queryFn: () => ShareApi.get({ post: post }),
  })

  if (query.isLoading || query.isError) return <></>

  return <div className="flex gap-2 items-center p-2 cursor-pointer rounded-lg hover:bg-white_1">
    <FaShare className="w-6 h-6" color="gray" />
    <div>Chia sẻ ({query.data.length})</div>
  </div>
}