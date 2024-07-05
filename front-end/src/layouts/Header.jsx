import { FaFacebook } from "react-icons/fa6";
import { RiFindReplaceLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { File } from "../components";
import Notification from './Notification'
import Messenger from './Messenger'
import Menu from './Menu'
import { useUser } from "../hooks/user";

export default function () {
  const {user} = useUser()
  const location = useLocation()
  const path = location.pathname
  
  if(path.startsWith('/login') || path.startsWith('/register')) return <></>

  return <div className="w-full flex justify-between p-2 dark:bg-black text-white bg-white border-b-2 border-teal">
    <div className="flex gap-2 basis-1/3">
      <Link to={'/'}>
        <FaFacebook color="#00ADB5" className="w-12 h-12" />
      </Link>
      <div className="p-2 rounded-full hover:bg-white_0 relative group">
        <RiFindReplaceLine className="w-8 h-8 " />
      </div>
    </div>

    <div className="flex gap-5 basis-1/3 max-lg:hidden">
      <Link to={'/'} className={`py-2 px-10 group relative ${path == '/' ? 'bg-teal text-white' : 'hover:bg-teal hover:text-white text-black dark:text-white'} rounded-lg`}>
        <FaHome className="w-8 h-8" />
      </Link>
      <div className={`py-2 px-10 group relative ${path.startsWith('/watch') ? 'bg-teal text-white' : 'hover:bg-teal hover:text-white text-black dark:text-white'} rounded-lg`}>
        <MdOutlineOndemandVideo className="w-8 h-8" />
      </div>
      <div className={`py-2 px-10 group relative ${path.startsWith('/market') ? 'bg-teal text-white' : 'hover:bg-teal hover:text-white text-black dark:text-white'} rounded-lg`}>
        <CgShoppingCart className="w-8 h-8" />
      </div>
      <Link to={'/groups'} className={`py-2 px-10 group relative ${path.startsWith('/groups') ? 'bg-teal text-white' : 'hover:bg-teal hover:text-white text-black dark:text-white'} rounded-lg`}>
        <GrGroup className="w-8 h-8" />
      </Link>
      <Link to={'/carogames'} className={`py-2 px-10 group relative  ${path.startsWith('/carogames') ? 'bg-teal text-white' : 'hover:bg-teal hover:text-white text-black dark:text-white'} rounded-lg `}>
        <IoGameController className="w-8 h-8" />
      </Link>
    </div>

    <div className="flex gap-2 items-center basis-1/3 justify-end">
      <Menu />
      <Messenger />
      <Notification />
      <Link to={'/users/' + user._id} className={`p-2 rounded-full hover:bg-white_0 relative group`}>
        {user.avatar && <File needToNavigate={false} id={user.avatar} className={'min-w-8 min-h-8 max-w-8 max-h-8 object-cover rounded-full'} />}
      </Link>
    </div >
  </div >
}