import { useState } from "react"
import { IoIosNotifications } from "react-icons/io"
export default function () {
  const [open, setOpen] = useState(false)
  return <button onClick={() => setOpen(!open)} className="p-2 rounded-full hover:bg-white_0 relative group">
    <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Notification</div>
    <IoIosNotifications color={`${open ? 'red' : ''}`} className="w-8 h-8" />
  </button>
}