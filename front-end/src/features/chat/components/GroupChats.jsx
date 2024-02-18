import {useQueries} from 'react-query'
import GroupChatApi from '../services/groupChat'
import { useContext } from 'react'
import CommonContext from '../../../store/CommonContext'

export default function ({cb}) {  
  const {user} = useContext(CommonContext)
  const query = useQueries([
    {
      queryKey : ['groupchats', user._id],
      queryFn : () => GroupChatApi.get(),
    }
  ])
  if(query.some(e => e.isError || e.isLoading)) return <></>
  return <div className='flex flex-col overflow-y-auto'>
    {query[0].data.map(cb)}
  </div>
}