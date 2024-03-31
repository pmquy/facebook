import { useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { CreateMessage, GroupChats, GroupHeader, Messages } from '../features/chat'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function () {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)
  const navigate = useNavigate()

  return <div>
    <button onClick={() => setOpen(!open)} className={`p-2 rounded-full  relative group ${open ? 'bg-white_0' : 'hover:bg-white_0'}`}>
      <FaFacebookMessenger color={`${open ? 'red' : ''}`} className="w-8 h-8" />
      <div className={` max-sm:fixed max-sm:top-16 max-sm:left-0 max-sm:w-full h-max absolute w-max sm:max-w-[500px] overflow-y-auto -bottom-2 sm:translate-y-full right-0 bg-white_1 rounded-b-lg transition-all duration-500 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
        <GroupChats cb={e => {
          return <div key={e._id}>
            <div onClick={() => setId(e._id)} className=" max-sm:hidden hover:bg-white_0 py-2 px-5 rounded-lg">{e.name}</div>
            <div onClick={() => navigate('/messages?id=' + e._id)} className=" hidden max-sm:block hover:bg-white_0 py-2 px-5 rounded-lg">{e.name}</div>
          </div>
        }} />
      </div>
    </button>

    {id && <div className="fixed z-10 card flex flex-col gap-5 right-5 bottom-12 max-h-[70%] w-[90%] max-w-[500px] overflow-y-auto">
      <div className=" sticky z-10 bg-red_0 p-5 top-0 flex justify-between">
        <IoCloseCircle onClick={() => setId(null)} className=" w-8 h-8" color="white" />
        <GroupHeader id={id} />
      </div>
      <div className="p-5 flex flex-col gap-5">
        <Messages id={id} />
        <CreateMessage id={id} />
      </div>
    </div>}
  </div>
}