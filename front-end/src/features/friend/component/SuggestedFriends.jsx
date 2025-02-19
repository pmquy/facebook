import { useQuery } from 'react-query'
import api from '../services/api'
import {FriendCard} from './Friends'

export default function () {

  const query = useQuery({
    queryKey: ['suggest'],
    queryFn: () => api.getSuggested({ q: {} }),
    initialData: []
  })

  return <div className='card flex flex-col gap-5'>
    <div className='text-2xl font-semibold'>Gợi ý kết bạn</div>
    <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
      {query.data.map(e => <FriendCard _status='suggested' id={e._id} />)}
    </div>
  </div>
}