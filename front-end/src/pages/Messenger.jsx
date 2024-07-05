import { useSearchParams } from 'react-router-dom'
import { GroupChats, CreateGroupChat, Messages, CreateMessage, GroupHeader } from '../features/chat'
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function () {
  const [param, setParam] = useSearchParams()

  return <div className='flex fixed z-[5] top-0 left-0 w-screen h-screen pt-16 gap-5'>

    <div className={`flex flex-col p-5 gap-5 h-full min-w-80 ${param.get('id') ? 'max-md:hidden' : 'flex-grow'}`}>
      <CreateGroupChat />
      <div className=' bg-grey dark:bg-teal rounded-lg overflow-hidden'>
        <GroupChats cb={e => <div className={` btn ${param.get('id') == e._id ? 'bg-teal dark:bg-black' : 'hover:bg-teal dark:hover:bg-black'} text-white text-1 px-5 py-2`} onClick={() => { param.set('id', e._id); setParam(param) }} key={e._id}>{e.name}</div>} />
      </div>
    </div>

    {param.get('id') && <div className={`${param.get('id') ? '' : 'max-md:hidden'} flex-grow flex flex-col gap-5 overflow-y-auto border-l-teal border-l-2`}>
      <div className="sticky z-[1] bg-teal p-5 top-0 text-white flex justify-between">
        <FaCircleArrowLeft className='w-8 h-8' color='white' onClick={() => { param.delete('id'); setParam(param) }} />
        <GroupHeader id={param.get('id')} />
      </div>
      <div className="p-5 flex-grow">
        <Messages id={param.get('id')} />
      </div>
      <div className="p-3">
        <CreateMessage id={param.get('id')} />
      </div>
    </div>}
  </div>
}