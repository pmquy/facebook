import { useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { CreateMessage, GroupChats, Messages } from '../features/chat'
import { IoCloseCircle } from "react-icons/io5";

export default function () {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)

  return <div>
    <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-white_0 relative group">
      <div className={` absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 ${open ? '' : 'group-hover:block'} hidden rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20 `}>Messenger</div>
      <FaFacebookMessenger color={`${open ? 'red' : ''}`} className="w-8 h-8" />
      <div className={` absolute max-h-[500px] overflow-y-auto z-30 bottom-0 translate-y-full right-0 card p-5 ${open ? 'block' : 'hidden'}`}>
        <GroupChats cb={e => <div onClick={() => setId(e._id)} className=" hover:bg-white_1 py-2 px-5 rounded-lg" key={e._id}>{e.name}</div>} />
      </div>
    </button>

    {id && <div className="fixed card flex flex-col gap-5 right-5 bottom-12 max-h-[70%] w-[90%] max-w-[500px] overflow-y-auto">
      <div className=" sticky bg-red_0 p-5 top-0 flex justify-end"><IoCloseCircle onClick={() => setId(null)} className=" w-8 h-8" /></div>
      <div className="p-5 flex flex-col gap-5">
        <Messages id={id} />
        <CreateMessage id={id} />
      </div>
    </div>}
  </div>
}