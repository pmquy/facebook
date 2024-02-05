import { MdAccountCircle } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";

export default function ({className}) {
  return <div className={`fixed right-0 overflow-y-auto flex flex-col gap-5 px-5 max-h-screen ${className}`}>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <MdAccountCircle className="w-8 h-8"/>
        <div className="uppercase font-semibold">Tài Khoản</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <FaUserFriends className="w-8 h-8"/>
        <div className="uppercase font-semibold">Bạn bè</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <GrGroup className="w-8 h-8"/>
        <div className="uppercase font-semibold">Nhóm</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <CgShoppingCart className="w-8 h-8"/>
        <div className="uppercase font-semibold">Marketplace</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <MdOutlineOndemandVideo className="w-8 h-8"/>
        <div className="uppercase font-semibold">Video</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <IoGameController className="w-8 h-8"/>
        <div className="uppercase font-semibold">Game</div>
      </div>
      <div className="flex gap-5 p-2 rounded-lg items-center hover:bg-white_1">
        <FaFacebookMessenger className="w-8 h-8"/>
        <div className="uppercase font-semibold">Messenger</div>
      </div>
  </div>
}