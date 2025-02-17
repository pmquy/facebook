import { useQuery } from 'react-query'
import api from '../services/api'
import FriendCard from './FriendCard'
import { useUser } from '../../../hooks/user'

export default function Friends() {

  const {user} = useUser()

  const query = useQuery({
    queryKey: ['friends'],
    queryFn: () => api.get({ q: { status: 1 } }),
    initialData: []
  })

  return <div>
    <div className='flex flex-col gap-5 card'>
      <div className="font-semibold text-2xl">Bạn bè ({query.data.length})</div>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {query.data.map(e => <FriendCard _status='accepted' id={user._id === e.sender ? e.receiver : e.sender} />)}
      </div>
    </div>
  </div>
}