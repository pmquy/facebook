import {useQueries} from 'react-query'
import GroupChatApi from '../services/groupChat'
import { useContext } from 'react'
import CommonContext from '../../../store/CommonContext'
import { useSearchParams } from 'react-router-dom'

export default function () {
  const [param, setParam] = useSearchParams()
  const {user} = useContext(CommonContext)

  const query = useQueries([
    {
      queryKey : ['groupchats', user._id],
      queryFn : () => GroupChatApi.get(),
    }
  ])

  if(query.some(e => e.isError || e.isLoading)) return <></>
  return <div className='flex flex-col gap-5 overflow-y-auto'>
    {query[0].data.map(e => <div className={`text-1 ${param.get('id') == e._id ? 'bg-white_2' : 'hover:bg-white_1'} px-5 py-2 rounded-lg`} onClick={() => {param.set('id', e._id); setParam(param)}} key={e._id}>{e.name}</div>)}
  </div>
}