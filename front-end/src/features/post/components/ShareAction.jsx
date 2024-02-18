import { FaShare } from 'react-icons/fa'
import { useQuery } from 'react-query'
import ShareApi from '../services/ShareApi'
import { useContext } from 'react'
import CommonContext from '../../../store/CommonContext'

export default function ({ id }) {
  const { users } = useContext(CommonContext)
  const query = useQuery({
    queryKey: ['shareposts', id],
    queryFn: () => ShareApi.get({ post: id }),
  })

  if (query.isLoading || query.isError) return <></>

  return <div className="flex gap-2 items-center p-2 cursor-pointer rounded-lg hover:bg-white_1">
    <FaShare className="w-6 h-6" color="gray" />
    <div>Chia sẻ ({query.data.length})</div>
  </div>
}