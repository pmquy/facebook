import {useQueries} from 'react-query'
import GroupChatApi from '../services/groupChat'

export default function GroupChats ({cb}) {  
  const query = useQueries([
    {
      queryKey : ['groupchats'],
      queryFn : () => GroupChatApi.get({q : {}}),
    }
  ])
  if(query.some(e => e.isError || e.isLoading)) return <></>
  return <div className='flex flex-col gap-2'>
    {query[0].data.map(cb)}
  </div>
}