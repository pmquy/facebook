import { useQueries, useQueryClient } from "react-query";
import PostApi from "../services/PostApi";
import Image from "../../../components/Image";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import UserAccount from "../../../components/UserAccount";
import { toast } from "react-toastify";
import { useContext, useEffect, useRef, useState } from "react";
import CommonContext from "../../../store/CommonContext";
import { Button } from "../../../components/ui";
import { parseDate } from '../../../utils/parseDate'
import { IoCloseCircle } from "react-icons/io5";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import SharePost from "./SharePost";

export default function ({ id }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const { user } = useContext(CommonContext)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const queryClient = useQueryClient()
  const query = useQueries([
    {
      queryKey: ['post', id],
      queryFn: () => PostApi.getById(id)
    }
  ])
  if (query.some(e => e.isError || e.isLoading)) return <></>
  const post = query[0].data
  const handleDelete = () => {
    PostApi.deleteById(id)
      .then(() => queryClient.invalidateQueries(['posts', user._id]))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className="fixed left-0 top-0 bg-black_trans w-screen h-screen z-20"></div>}
    <div ref={ref} className={`max-w-[90%] max-h-[80%] max-sm:min-w-full max-sm:min-h-full fixed left-1/2 -translate-x-1/2 top-1/2 ${open ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-all duration-500 z-20  overflow-x-auto`}>
      <div className="card flex flex-col gap-5 relative">
        <div className="flex gap-5 p-5 items-center justify-between sticky top-0 z-20 card_1">
          <UserAccount id={post.user} />
          <div>Vào {parseDate(post.createdAt)}</div>
          <IoCloseCircle onClick={() => setOpen(false)} className="w-8 h-8" />
        </div>
        <div className="p-5 flex flex-col gap-5">
          <div className=" card_1 p-5 flex flex-col gap-5">
            <div className=" whitespace-pre-line">{post.content}</div>
            {post.image && <Image id={post.image} />}
          </div>
          <div className="flex justify-between">
            <LikePost post={id} />
            <CommentPost post={id} />
            <SharePost post={id} />
          </div>
          <CreateComment post={id} />
          <hr />
          <Comments post={id} comment={''} />
        </div>
      </div>
    </div>

    <div className="card p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <UserAccount id={post.user} />
        {user._id == post.user && <Button onClick={handleDelete}>Xóa</Button>}
      </div>
      <div>Vào {parseDate(post.createdAt)}</div>
      <div onClick={() => setOpen(true)} className=" card_1 p-5 flex flex-col gap-5">
        <div className=" whitespace-pre-line">{post.content}</div>
        {post.image && <Image id={post.image} />}
      </div>
      <div className="flex justify-between">
        <LikePost post={id} />
        <CommentPost post={id} />
        <SharePost post={id} />
      </div>
    </div>
  </div>
}  