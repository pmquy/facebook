import { useQueries } from "react-query";
import PostApi from "../services/PostApi";
import { File } from "../../../components";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import UserAccount from "../../../components/UserAccount";
import { useContext, useEffect, useRef, useState } from "react";
import { parseDate } from '../../../utils/parseDate'
import { IoCloseCircle } from "react-icons/io5";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import SharePost from "./SharePost";
import PostContext from '../store/PostContext'
import { GroupAccount } from '../../group'
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import { BsThreeDots } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { useUser } from "../../../hooks/user";
import CommonContext from "../../../store/CommonContext";
import { useNavigate } from "react-router-dom";

export default function ({ id }) {
  const [open, setOpen] = useState(false)
  const {headerRef} = useContext(CommonContext)
  const navigate = useNavigate()
  const ref = useRef()
  const { user } = useUser()
  const query = useQueries([
    {
      queryKey: ['post', id],
      queryFn: () => PostApi.getById(id)
    }
  ])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    headerRef.current.style['z-index'] = open ? 5 : 10
  }, [open])

  if (query.some(e => e.isError || e.isLoading)) return <></>

  const post = query[0].data

  return <PostContext.Provider value={{ setCreate: setOpen, post: post, }}>
    <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`fixed left-0 top-0 bg-black_trans z-10 w-screen h-screen ${open ? 'block' : 'hidden'}`} />

    <div ref={ref} className={` card dark:card-black w-[90%] max-h-[80%] sm:max-w-[900px] max-sm:w-screen max-sm:max-h-screen fixed left-1/2 -translate-x-1/2 top-1/2 ${open ? ' -translate-y-1/2' : 'translate-y-[1000px]'} transition-transform duration-500 z-10  overflow-x-auto`}>
      <div className="flex flex-col gap-5 relative">
        <div className="p-5 flex flex-col gap-2  sticky z-10 border-b-2 border-white top-0 bg-teal text-white">
          <div className="flex gap-5 justify-between">
            <div className="flex gap-2">
              <UserAccount id={post.user} />
              {post.group && <IoMdArrowDropright className=" w-8 h-8" />}
              {post.group && <GroupAccount id={post.group} />}
            </div>
            <IoCloseCircle onClick={() => setOpen(false)} className="w-8 h-8" />
          </div>
          <div>Vào {parseDate(post.createdAt)}</div>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className=" whitespace-pre-line">{post.content}</div>
            <div className="flex flex-wrap gap-2">
              {post.files.map(e => <div onClick={() => navigate('/posts/' + id)} key={e}><File id={e} /></div>)}
            </div>
          </div>
          <div className="border-t-2 border-teal"></div>
          <div className="flex justify-between">
            <LikePost />
            <CommentPost />
            <SharePost />
          </div>
          <CreateComment />
          <Comments />
        </div>
      </div>
    </div>

    <div className="card dark:card-black p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <UserAccount id={post.user} />
          {post.group && <IoMdArrowDropright className=" w-8 h-8" />}
          {post.group && <GroupAccount id={post.group} />}
        </div>
        {
          user._id == post.user &&
          <div className="group/1 relative">
            <BsThreeDots className="w-8 h-8" />
            <div className=" absolute z-10 flex flex-col rounded-lg right-0 transition-all duration-500 w-max max-h-0 overflow-hidden bg-grey group-hover/1:max-h-screen text-white">
              <div className="hover:bg-teal"><DeletePost /></div>
              <div className="hover:bg-teal"><UpdatePost /></div>
            </div>
          </div>
        }
      </div>
      <div>Vào {parseDate(post.createdAt)}</div>
      <div onClick={() => setOpen(true)} className="flex flex-col gap-2">
        <div className=" whitespace-pre-line">{post.content}</div>
        {post.files[0] && <File id={post.files[0]} />}
      </div>
      <div className="flex justify-between">
        <LikePost />
        <CommentPost />
        <SharePost />
      </div>
    </div>
  </PostContext.Provider>
}  