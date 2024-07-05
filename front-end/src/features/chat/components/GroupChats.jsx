import {useQueries} from 'react-query'
import GroupChatApi from '../services/groupChat'
import { useUser } from '../../../hooks/user'

export default function ({cb}) {  
  const {user} = useUser()
  const query = useQueries([
    {
      queryKey : ['groupchats', user._id],
      queryFn : () => GroupChatApi.get(),
    }
  ])
  if(query.some(e => e.isError || e.isLoading)) return <></>
  return <div className='flex flex-col'>
    {query[0].data.map(cb)}
  </div>
}