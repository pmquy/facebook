import { useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { CreateMessage, GroupChats, GroupHeader, Messages } from '../features/chat'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

export default function () {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)
  const navigate = useNavigate()

  return <div className="relative">
    <IconButton onClick={() => setOpen(!open)} color={open ? 'primary' : 'inherit'}>
      <FaFacebookMessenger className="w-6 h-6" />
    </IconButton>
    <div className={` max-sm:fixed max-sm:top-16 max-sm:left-0 max-sm:w-full h-max absolute w-max sm:max-w-[500px] overflow-y-auto -bottom-2 sm:translate-y-full right-0  rounded-b-lg transition-all duration-500 bg-surface text-onSurface shadow-md ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
      <GroupChats cb={e => {
        return <div key={e._id}>
          <div onClick={() => setId(e._id)} className=" max-sm:hidden  py-2 px-5">{e.name}</div>
          <div onClick={() => navigate('/messages?id=' + e._id)} className=" hidden max-sm:block py-2 px-5">{e.name}</div>
        </div>
      }} />
    </div>

    {id && <div className="fixed z-20 bg-surface text-onSurface rounded-lg overflow-hidden flex flex-col shadow-lg right-5 bottom-12 h-[70%] w-[90%] max-w-[400px]">
      <div className="  bg-primary text-onPrimary p-5 flex justify-between">
        <IoCloseCircle onClick={() => setId(null)} className=" w-6 h-6" color="white" />
        <GroupHeader id={id} />
      </div>
      <div className="p-5 flex flex-col grow gap-5 overflow-y-auto">
        <Messages id={id} />
      </div>
      <div className="p-5 border-primary border-t-2">
        <CreateMessage id={id} />
      </div>
    </div>}
  </div>
}