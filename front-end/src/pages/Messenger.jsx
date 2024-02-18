import { useSearchParams } from 'react-router-dom'
import { GroupChats, CreateGroupChat, Messages, CreateMessage } from '../features/chat'
import { FaCircleArrowLeft, FaCircleInfo  } from "react-icons/fa6";
export default function () {
  const [param, setParam] = useSearchParams()
  return <div className='flex gap-10 fixed left-0 h-[90%] w-full p-5'>
    <div className={`card p-5 flex flex-col gap-5 ${param.get('id') ? 'max-md:hidden' : 'flex-grow'}`}>
      <CreateGroupChat />
      <GroupChats cb={e => <div className={`text-1 ${param.get('id') == e._id ? 'bg-white_2' : 'hover:bg-white_1'} px-5 py-2 rounded-lg`} onClick={() => { param.set('id', e._id); setParam(param) }} key={e._id}>{e.name}</div>} />
    </div>
    {param.get('id') && <div className={`${param.get('id') ? '' : 'max-md:hidden'} flex-grow overflow-y-auto flex flex-col gap-5 card `}>
      <div className=" sticky bg-red_0 p-5 top-0 flex justify-between">
        <FaCircleArrowLeft className='w-8 h-8' onClick={() => {param.delete('id'); setParam(param)}}/>
        <FaCircleInfo className='w-8 h-8'/>
      </div>
      <div className="p-5 flex flex-col gap-5">
        <Messages id={param.get('id')} />
        <CreateMessage id={param.get('id')} />
      </div>
    </div>}
  </div>
}