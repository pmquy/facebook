import { useQueries } from "react-query";
import PostApi from "../services/PostApi";
import Image from "../../../components/Image";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import UserAccount from "../../../components/UserAccount";
import { useContext, useEffect, useRef } from "react";
import CommonContext from "../../../store/CommonContext";
import { parseDate } from '../../../utils/parseDate'
import { IoCloseCircle } from "react-icons/io5";
import LikePost from "./LikePost";
import CommentPost from "./CommentPost";
import SharePost from "./SharePost";
import PostContext from '../store/PostContext'
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import { BsThreeDots } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import Video from "../../../components/Video";

export default function ({ id }) {
  const [params, setParams] = useSearchParams()
  const ref = useRef()
  const { user } = useContext(CommonContext)
  const query = useQueries([
    {
      queryKey: ['post', id],
      queryFn: () => PostApi.getById(id)
    }
  ])
  useEffect(() => {
    document.body.style.overflow = params.get('open') == id ? 'hidden' : 'auto'
  }, [params.get('open') == id, id])
  if (query.some(e => e.isError || e.isLoading)) return <></>
  const setCreate = e => {
    if (e) {
      params.set('open', id)
    }
    else {
      params.delete('open')
    }
    setParams(params)
  }
  const post = query[0].data
  return <PostContext.Provider value={{ setCreate: setCreate, post: post, }}>
    <div onClick={e => {
      if (!ref.current.contains(e.target)) {
        params.delete('open')
        setParams(params)
      }
    }} className={`fixed left-0 top-0 bg-black_trans w-screen h-screen z-20 ${(params.get('open') == id) ? 'block' : 'hidden'}`}></div>
    <div ref={ref} className={`min-w-[70%] card max-h-[80%] max-sm:min-w-full max-sm:min-h-full fixed left-1/2 -translate-x-1/2 top-1/2 ${(params.get('open') == id) ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-all duration-500 z-20  overflow-x-auto`}>
      <div className="flex flex-col gap-5 relative">
        <div className="flex gap-5 p-5 items-center justify-between sticky top-0 z-20 bg-teal text-white">
          <UserAccount id={post.user} />
          <div>Vào {parseDate(post.createdAt)}</div>
          <IoCloseCircle onClick={() => setCreate(false)} className="w-8 h-8" />
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div className=" bg-teal text-white p-5 flex flex-col gap-2">
            <div className=" whitespace-pre-line">{post.content}</div>
            {post.images.map(e => <div key={e}><Image id={e} /></div>)}
            {post.videos.map(e => <div key={e}><Video id={e} /></div>)}
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
    <div className="card p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <UserAccount id={post.user} />
        {user._id == post.user &&
          <div className="group/1 relative">
            <BsThreeDots className="w-8 h-8" />
            <div className=" absolute flex flex-col rounded-lg right-0 transition-all duration-500 w-max max-h-0 overflow-hidden bg-grey group-hover/1:max-h-screen text-white">
              <div className="hover:bg-teal"><DeletePost /></div>
              <div className="hover:bg-teal"><UpdatePost /></div>
            </div>
          </div>
        }
      </div>
      <div>Vào {parseDate(post.createdAt)}</div>
      <div onClick={() => setCreate(true)} className=" bg-teal text-white p-5 flex flex-col gap-2">
        <div className=" whitespace-pre-line">{post.content}</div>
        {post.images[0] && <Image id={post.images[0]} />}
        {post.videos[0] && <Video id={post.videos[0]} />}
      </div>
      <div className="flex justify-between">
        <LikePost />
        <CommentPost />
        <SharePost />
      </div>
    </div>
  </PostContext.Provider>
}  