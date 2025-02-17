import { Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillControl } from "react-icons/ai";
import { FaHome, FaNewspaper } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { MdClose, MdEvent, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import { FilePreview } from "../components";
import { useUser } from "../hooks/user";

export default function MainNavBar() {

  const { user } = useUser()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return <div className="">
    <div className="lg:hidden">
      <div className="flex items-center">
        <IconButton onClick={() => setOpen(true)}><AiFillControl className="w-8 h-8 text-primary" /></IconButton>
        <div className="heading text-xl">My profile</div>
      </div>
    </div>
    {open && <div className="fixed z-10 bg-black/30 lg:hidden top-0 left-0 w-full h-full"></div>}
    <div className={`bg-surface text-onSurface rounded-md shadow max-lg:fixed top-0 left-0 z-10 max-lg:w-[350px] max-lg:p-5 max-lg:h-full overflow-y-auto transition-transform duration-500 ${open ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}>
      <div className="lg:hidden mb-5 text-end"><IconButton onClick={() => setOpen(false)}><MdClose className="w-6 h-6" /></IconButton></div>
      <img className="h-16 object-cover w-full " src={user.cover.url}></img>
      <img src={user.avatar.url} className="h-20 w-20 border-2 overflow-hidden object-cover rounded-md border-primary -translate-y-1/3 m-auto"></img>
      <div className="flex flex-col gap-5 items-center pb-5">
        <div className=" flex flex-col items-center gap-1">
          <div className="text-xl heading">{user.firstName + ' ' + user.lastName}</div>
          <div className="text-sm">Web Developer at Webestica</div>
        </div>
        <div className="mx-10 text-center">I'd love to change the world, but they won’t give me the source code.</div>
        <div className="flex justify-between w-full px-10">
          <div className="flex flex-col items-center">
            <div className="heading">256</div>
            <div className="text-sm">Posts</div>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col items-center">
            <div className="heading">1.2k</div>
            <div className="text-sm">Followers</div>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col items-center">
            <div className="heading">500</div>
            <div className="text-sm">Following</div>
          </div>
        </div>
        <Divider flexItem />
        <Link to={'/'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <FaHome size={24} />
          <div className="heading hover:text-primary">Feeds</div>
        </Link>
        <Link to={'/friends'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <MdPerson size={24} />
          <div className="heading hover:text-primary">Connections</div>
        </Link>
        <Link to={'#'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <FaNewspaper size={24} />
          <div className="heading hover:text-primary">Latest News</div>
        </Link>
        <Link to={'/events'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <MdEvent size={24} />
          <div className="heading hover:text-primary">Events</div>
        </Link>
        <Link to={'/groups'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <FaUserGroup size={24} />
          <div className="heading hover:text-primary">Groups</div>
        </Link>
        <Link to={'#'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <IoNotifications size={24} />
          <div className="heading hover:text-primary">Notifications</div>
        </Link>
        <Link to={'#'} className="flex gap-2 items-center group self-start px-10 hover:text-primary">
          <IoSettings size={24} />
          <div className="heading hover:text-primary">Settings</div>
        </Link>
        <Divider flexItem />
        <Link to={"#"} className="heading text-primary text-sm">View profile</Link>
      </div>
    </div>
  </div>
}