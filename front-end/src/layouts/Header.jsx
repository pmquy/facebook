import { FaFacebook } from "react-icons/fa6";
import { RiFindReplaceLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { getIndexFromPathName } from "../utils/path";
import { useContext } from "react";
import {UserContext} from "../features/account";


export default function () {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const index = getIndexFromPathName(location.pathname)

  return <div className="z-10 fixed w-full flex justify-between p-2 bg-white_1 border-b-2">
    <div className="flex gap-2 basis-1/3">
      <Link to={'/'}>
        <FaFacebook color="red" className="w-12 h-12" />
      </Link>
      <div className="p-2 rounded-full hover:bg-white_0 relative group">
        <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Find</div>
        <RiFindReplaceLine className="w-8 h-8 " />
      </div>
    </div>

    <div className="flex gap-5 basis-1/3 max-lg:hidden">
      <Link to={'/'} className="py-2 px-10 group relative hover:bg-white_0 rounded-lg">
        {index == 1 ?
          <div className="absolute h-1 bg-red_0 left-0 bottom-0 w-full" />
          :
          <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Home</div>
        }
        <FaHome className="w-8 h-8" color={index == 1 ? 'red' : ''} />
      </Link>
      <div className="py-2 px-10 group relative hover:bg-white_0 rounded-lg">
        {index == 2 ?
          <div className="absolute h-1 bg-red_0 left-0 bottom-0 w-full" />
          :
          <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Video</div>
        }
        <MdOutlineOndemandVideo className="w-8 h-8" color={index == 2 ? 'red' : ''} />
      </div>
      <div className="py-2 px-10 group relative hover:bg-white_0 rounded-lg">
        {index == 3 ?
          <div className="absolute h-1 bg-red_0 left-0 bottom-0 w-full" />
          :
          <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Marketplace</div>
        }
        <CgShoppingCart className="w-8 h-8" color={index == 3 ? 'red' : ''} />
      </div>
      <div className="py-2 px-10 group relative hover:bg-white_0 rounded-lg">
        {index == 4 ?
          <div className="absolute h-1 bg-red_0 left-0 bottom-0 w-full" />
          :
          <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Group</div>
        }
        <GrGroup className="w-8 h-8" color={index == 4 ? 'red' : ''} />
      </div>
      <div className="py-2 px-10 group relative hover:bg-white_0 rounded-lg">
        {index == 5 ?
          <div className="absolute h-1 bg-red_0 left-0 bottom-0 w-full" />
          :
          <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Gaming</div>
        }
        <IoGameController className="w-8 h-8" color={index == 5 ? 'red' : ''} />
      </div>
    </div>

    <div className="flex gap-2 basis-1/3 justify-end">
      <div className="p-2 rounded-full hover:bg-white_0 relative group">
        <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Menu</div>
        <IoMdMenu className="w-8 h-8" />
      </div>
      <div className="p-2 rounded-full hover:bg-white_0 relative group">
        <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Messenger</div>
        <FaFacebookMessenger className="w-8 h-8" />
      </div>
      <div className="p-2 rounded-full hover:bg-white_0 relative group">
        <div className=" absolute w-max p-2 left-1/2 -translate-x-1/2 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%] z-20">Notification</div>
        <IoIosNotifications className="w-8 h-8" />
      </div>
      <Link to={user ? '/user/' + user._id : '/login'} className="p-2 rounded-full hover:bg-white_0 relative group">
        <div className=" absolute w-max p-2 right-0 bottom-0 hidden group-hover:block rounded-lg bg-red_0 text-white_0 translate-y-[150%]">{user ? user.firstName + ' ' + user.lastName : 'Đăng nhập'}</div>
        <MdAccountCircle className="w-8 h-8" />
      </Link>
    </div >
  </div >
}