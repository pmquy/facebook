import UserAccount from "../../../components/UserAccount";
import Image from '../../../components/Image'
import { BsThreeDots } from "react-icons/bs";
import { Button } from "../../../components/ui";
import CommentApi from '../services/CommentApi'
import { useQueryClient } from "react-query";
import { useState } from "react";
import CreateComment from './CreateComment'
import Comments from './Comments'
import { toast } from "react-toastify";
import LikeComment from "./LikeComment";

export default function ({ comment }) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  
  const handleDelete = () => {
    CommentApi.deleteById(comment._id)
      .then(() => queryClient.invalidateQueries(['comments', {post : comment.post, comment : comment.comment}]))
      .catch(err => toast(err.message, {type : 'error'}))      
  }

  return <div className={`flex flex-col gap-2`}>    
    <div className="relative">
      <UserAccount id={comment.user} />
      {comment.comment && <div className=" absolute left-0 top-1/2 -tranlsate-y-1/2 border-red_0 -translate-x-full w-8 border-t-2"></div>}
    </div>
    <div className="flex items-center gap-5">
      <div className="flex flex-col gap-2">
        <div className=" whitespace-pre-line">{comment.content}</div>
        {comment.image && <Image id={comment.image} className={'w-64'} />}
      </div>
      <div className="group relative">
        <BsThreeDots className=" w-8 h-8 hover:bg-white_1 rounded-full" />
        <div className="absolute left-full top-0 hidden group-hover:block z-10">
          <div className="p-5 rounded-lg flex bg-white_1 flex-col gap-2">
            <Button onClick={handleDelete}>Xóa</Button>
            <Button className={'bg-black'}>Chỉnh sửa</Button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-5">
      <LikeComment comment={comment._id}/>
      <div onClick={() => setOpen(true)}>Phản hồi</div>
    </div>
    <Comments post={comment.post} comment={comment._id}/>    
    {open && <CreateComment post={comment.post} comment={comment._id}/>}
  </div>
}