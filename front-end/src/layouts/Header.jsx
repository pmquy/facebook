import { FaFacebook } from "react-icons/fa6";
import { RiFindReplaceLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { getIndexFromPathName } from "../utils/path";
import { useContext } from "react";
import CommonContext from '../store/CommonContext'
import Notification from './Notification'
import Messenger from './Messenger'
import Menu from './Menu'
import Image from "../components/Image";

export default function () {
  const { user } = useContext(CommonContext)
  const location = useLocation()
  const index = getIndexFromPathName(location.pathname)
  if(!index) return <></>
  return <div className="sticky z-10 top-0 w-full flex justify-between p-2 bg-white border-b-2">
    <div className="flex gap-2 basis-1/3">
      <Link to={'/'}>
        <FaFacebook color="#00ADB5" className="w-12 h-12" />
      </Link>
      <div className="p-2 rounded-full hover:bg-white_0 relative group">
        <RiFindReplaceLine className="w-8 h-8 " />
      </div>
    </div>

    <div className="flex gap-5 basis-1/3 max-lg:hidden">
      <Link to={'/'} className={`py-2 px-10 group relative ${index == 1 ? 'bg-black' : 'hover:bg-teal'} rounded-lg`}>
        <FaHome className="w-8 h-8" color={index == 1 ? '#00ADB5' : '#222831'} />
      </Link>
      <div className={`py-2 px-10 group relative ${index == 2 ? 'bg-black' : 'hover:bg-teal'} rounded-lg`}>
        <MdOutlineOndemandVideo className="w-8 h-8" color={index == 2 ? '#00ADB5' : '#222831'} />
      </div>
      <div className={`py-2 px-10 group relative ${index == 3 ? 'bg-black' : 'hover:bg-teal'} rounded-lg`}>
        <CgShoppingCart className="w-8 h-8" color={index == 3 ? '#00ADB5' : '#222831'} />
      </div>
      <div className={`py-2 px-10 group relative ${index == 4 ? 'bg-black' : 'hover:bg-teal'} rounded-lg`}>
        <GrGroup className="w-8 h-8" color={index == 4 ? '#00ADB5' : '#222831'} />
      </div>
      <Link to={'/carogames'} className={`py-2 px-10 group relative  ${index == 5 ? 'bg-black' : 'hover:bg-teal'} rounded-lg `}>
        <IoGameController className="w-8 h-8" color={index == 5 ? '#00ADB5' : '#222831'} />
      </Link>
    </div>

    <div className="flex gap-2 items-center basis-1/3 justify-end">
      <Menu />
      <Messenger />
      <Notification />
      <Link to={'/user/' + user._id} className={`p-2 rounded-full hover:bg-white_0 relative group`}>
        {user.avatar && <Image id={user.avatar} className={'min-w-8 min-h-8 max-w-8 max-h-8 object-cover rounded-full'} />}
      </Link>
    </div >
  </div >
}