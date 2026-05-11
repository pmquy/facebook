import { BsThreeDots } from 'react-icons/bs'
import { useState } from 'react'
import { useUser } from '../../../hooks/user'
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

export default function SettingPost({post}) {
  const [open, setOpen] = useState(false)
  const { user } = useUser()

  return <div className="relative">
    <BsThreeDots onClick={() => setOpen(prev => !prev)} className="w-6 h-6 btn hover:bg-background p-1 rounded-full" />
    {open && <div className="absolute right-0 top-full w-max bg-background shadow text-onBackground font-semibold flex flex-col">
      <button className="p-2  hover:text-onSurface">Ẩn bài viết</button>
      {user._id == post.user._id && <div className=" hover:text-onSurface"><DeletePost /></div>}
      {user._id == post.user._id && <div className=" hover:text-onSurface"><UpdatePost /></div>}
    </div>}
  </div>
}