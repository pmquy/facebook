import UserAccount from "../../../components/UserAccount";
import Image from '../../../components/Image'
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { Button } from "../../../components/ui";
import CommentApi from '../services/CommentApi'
import { useQueryClient } from "react-query";

export default function ({ comment }) {
  const queryClient = useQueryClient()

  const handleDelete = () => {
    CommentApi.deleteById(comment._id)
      .then(() => queryClient.invalidateQueries(['commentposts', comment.post]))    
  }

  return <div className="flex flex-col gap-2 ">
    <UserAccount id={comment.user} />
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
  </div>
}