import { useSearchParams } from 'react-router-dom'
import { GroupChats, CreateGroupChat, Messages, CreateMessage, GroupHeader } from '../features/chat'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useContext } from 'react';
import CommonContext from '../store/CommonContext';

export default function () {
  const { user } = useContext(CommonContext)
  if (!user) return <></>
  const [param, setParam] = useSearchParams()
  return <div>
    <div className='flex gap-5'>
      <div className={`bg-white relative min-w-72 ${param.get('id') ? 'max-md:hidden' : 'flex-grow'}`}>
        <div className=' sticky top-16'>
          <div className={` flex flex-col w-full p-5 gap-5 top-0 left-0 overflow-y-scroll ${param.get('id') ? 'absolute' : ''}`}>
            <CreateGroupChat />
            <div className=' bg-grey rounded-lg overflow-hidden'>
              <GroupChats cb={e => <div className={` btn ${param.get('id') == e._id ? 'bg-teal' : 'hover:bg-teal'} text-white text-1 px-5 py-2`} onClick={() => { param.set('id', e._id); setParam(param) }} key={e._id}>{e.name}</div>} />
            </div>
          </div>
        </div>
      </div>
      {param.get('id') && <div className={`${param.get('id') ? '' : 'max-md:hidden'} flex-grow flex flex-col gap-5 border-l-2 border-teal`}>
        <div className="sticky z-0 bg-teal p-5 top-16 text-white flex justify-between">
          <FaCircleArrowLeft className='w-8 h-8' color='white' onClick={() => { param.delete('id'); setParam(param) }} />
          <GroupHeader id={param.get('id')} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="p-5">
            <Messages id={param.get('id')} />
          </div>
          <div className="p-3">
            <CreateMessage id={param.get('id')} />
          </div>
        </div>
      </div>}
    </div>
  </div>
}