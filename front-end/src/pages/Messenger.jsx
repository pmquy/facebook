import { useSearchParams } from 'react-router-dom'
import { GroupChats, CreateGroupChat, Messages, CreateMessage, GroupHeader } from '../features/chat'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useContext } from 'react';
import CommonContext from '../store/CommonContext';

export default function () {
  const {user} = useContext(CommonContext)
  if(!user) return <></>
  const [param, setParam] = useSearchParams()
  return <div>
    <div className='flex gap-5 fixed left-0 h-[90%] w-full'>
      <div className={`bg-white_0 p-5 flex flex-col gap-5 ${param.get('id') ? 'max-md:hidden' : 'flex-grow'}`}>
        <CreateGroupChat />
        <GroupChats cb={e => <div className={`text-1 btn ${param.get('id') == e._id ? 'bg-white_2' : 'hover:bg-white_1'} px-5 py-2 rounded-lg`} onClick={() => { param.set('id', e._id); setParam(param) }} key={e._id}>{e.name}</div>} />
      </div>
      {param.get('id') && <div className={`${param.get('id') ? '' : 'max-md:hidden'} flex-grow overflow-y-auto flex flex-col gap-5 bg-white_0 `}>
        <div className=" sticky z-10 bg-red_0 p-5 top-0 flex justify-between">
          <FaCircleArrowLeft className='w-8 h-8' color='white' onClick={() => { param.delete('id'); setParam(param) }} />
          <GroupHeader id={param.get('id')}/>
        </div>
        <div className="p-5 flex flex-col gap-5">
          <Messages id={param.get('id')} />
          <CreateMessage id={param.get('id')} />
        </div>
      </div>}
    </div>
  </div>
}