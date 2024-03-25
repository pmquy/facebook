import { useState } from "react"
import { IoMdMenu } from "react-icons/io"
import { MdAccountCircle } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { useContext } from "react";
import CommonContext from "../store/CommonContext";
import { Link } from "react-router-dom";

export default function () {
  const {user} = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  return <div className=" relative">
    <div onClick={() => setOpen(!open)} className={`p-2 rounded-full ${open ? 'bg-white_0' : 'hover:bg-white_0'} relative group`}>
      <IoMdMenu color={open ? 'red' : ''} className="w-8 h-8" />
    </div>
    <div className={` max-sm:fixed z-30 max-sm:top-16 max-sm:left-0 max-sm:w-full h-max absolute w-max overflow-y-auto -bottom-2 sm:translate-y-full right-0 bg-white_1 rounded-b-lg transition-all duration-500 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
      <Link onClick={() => setOpen(false)} to={'/user/' + user._id} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <MdAccountCircle className="w-8 h-8" />
        <div className="text-1">{user.firstName + ' ' + user.lastName}</div>
      </Link>
      <Link onClick={() => setOpen(false)} to={'/friends'} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <FaUserFriends className="w-8 h-8" />
        <div className="text-1">Bạn bè</div>
      </Link>
      <Link onClick={() => setOpen(false)} to={'/'} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <GrGroup className="w-8 h-8" />
        <div className="text-1">Nhóm</div>
      </Link>
      <Link onClick={() => setOpen(false)} to={'/'} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <CgShoppingCart className="w-8 h-8" />
        <div className="text-1">Marketplace</div>
      </Link>
      <Link onClick={() => setOpen(false)} to={'/'} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <MdOutlineOndemandVideo className="w-8 h-8" />
        <div className="text-1">Video</div>
      </Link>
      <Link onClick={() => setOpen(false)} to={'/carogames'} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <IoGameController className="w-8 h-8" />
        <div className="text-1">Game</div>
      </Link>
      <Link onClick={() => setOpen(false)} to={'/messages'} className="flex gap-5 btn p-2 rounded-lg items-center hover:bg-white_0 px-5">
        <FaFacebookMessenger className="w-8 h-8" />
        <div className="text-1">Messenger</div>
      </Link>
    </div>
  </div>
}