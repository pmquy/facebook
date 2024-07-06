import { useQuery } from 'react-query'
import api from '../services/api'
import FriendCard from './FriendCard'
import { useUser } from '../../../hooks/user'

export default function () {
  const { user } = useUser()
  const query = useQuery({
    queryKey: ['sending'],
    queryFn: () => api.get({ q: { status: 0, sender: user._id } }),
    initialData: []
  })

  return <div className='flex flex-col gap-5 card'>
    <div className="font-semibold text-2xl">Lời mời đã gửi đi</div>
    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
      {query.data.map(e => <FriendCard _status='sending' id={e.receiver} />)}
    </div>
  </div>
}