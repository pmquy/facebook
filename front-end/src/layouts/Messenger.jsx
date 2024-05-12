import { useContext, useState } from "react"
import { FaFacebookMessenger } from "react-icons/fa"
import { CreateMessage, GroupChats, GroupHeader, Messages } from '../features/chat'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CommonContext from "../store/CommonContext";

export default function () {
  const {darkMode} = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)
  const navigate = useNavigate()

  return <div>
    <button onClick={() => setOpen(!open)} className={`p-2 rounded-full  relative group ${open ? 'bg-black' : 'hover:bg-teal'}`}>
      <FaFacebookMessenger color={`${open ? '#00ADB5' : `${darkMode ? '#EEEEEE' : '#222831'}`}`} className="w-8 h-8" />
      <div className={` max-sm:fixed max-sm:top-16 max-sm:left-0 max-sm:w-full h-max absolute w-max sm:max-w-[500px] overflow-y-auto -bottom-2 sm:translate-y-full right-0 dark:bg-black bg-teal rounded-b-lg transition-all duration-500 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
        <GroupChats cb={e => {
          return <div className="dark:hover:bg-teal hover:bg-grey text-white" key={e._id}>
            <div onClick={() => setId(e._id)} className=" max-sm:hidden  py-2 px-5">{e.name}</div>
            <div onClick={() => navigate('/messages?id=' + e._id)} className=" hidden max-sm:block py-2 px-5">{e.name}</div>
          </div>
        }} />
      </div>
    </button>

    {id && <div className="fixed z-10 card dark:card-black flex flex-col gap-5 right-5 bottom-12 max-h-[70%] w-[90%] max-w-[400px] overflow-y-auto">
      <div className=" sticky z-10 bg-teal text-white p-5 top-0 flex justify-between">
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