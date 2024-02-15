import { useSearchParams } from 'react-router-dom'
import {GroupChats, CreateGroupChat, Messages, CreateMessage} from '../features/chat'
export default function () {

  const [param, setParam] = useSearchParams()

  return <div className='flex gap-10 '>
    <div className='card p-5 h-[650px] flex flex-col gap-5'>
      <CreateGroupChat/>
      <GroupChats/>
    </div>
    {param.get('id') && <div className=' flex-grow overflow-y-auto flex flex-col gap-5 card p-5 h-[650px]'>
      <div className='flex-grow'><Messages id={param.get('id')}/></div>
      <CreateMessage id={param.get('id')}/>
    </div>}
  </div>
}