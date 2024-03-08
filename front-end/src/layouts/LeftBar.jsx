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

export default function ({className}) {
  const {user} = useContext(CommonContext)
  return <div className={`fixed left-0 overflow-y-auto flex flex-col gap-5 max-h-screen ${className}`}>
      <Link to={'/user/' + user._id} className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <MdAccountCircle className="w-8 h-8"/>
        <div className="text-1">{user.firstName + ' ' + user.lastName}</div>
      </Link>
      <Link to={'/friends'} className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <FaUserFriends className="w-8 h-8"/>
        <div className="text-1">Bạn bè</div>
      </Link>
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
      <Link to={'/messages'} className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_0">
        <FaFacebookMessenger className="w-8 h-8"/>
        <div className="text-1">Messenger</div>
      </Link>
  </div>
}