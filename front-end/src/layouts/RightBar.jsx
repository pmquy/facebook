import { MdAccountCircle } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { useContext } from "react";
import CommonContext from "../store/CommonContext";


export default function ({className}) {
  const {user} = useContext(CommonContext)
  return <div className={`fixed right-0 overflow-y-auto flex flex-col gap-5 px-5 max-h-screen ${className}`}>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <MdAccountCircle className="w-8 h-8"/>
        {user && <div className="text-1">{user.firstName + ' ' + user.lastName}</div>}
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <FaUserFriends className="w-8 h-8"/>
        <div className="text-1">Bạn bè</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <GrGroup className="w-8 h-8"/>
        <div className="text-1">Nhóm</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <CgShoppingCart className="w-8 h-8"/>
        <div className="text-1">Marketplace</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <MdOutlineOndemandVideo className="w-8 h-8"/>
        <div className="text-1">Video</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <IoGameController className="w-8 h-8"/>
        <div className="text-1">Game</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <FaFacebookMessenger className="w-8 h-8"/>
        <div className="text-1">Messenger</div>
      </div>
  </div>
}