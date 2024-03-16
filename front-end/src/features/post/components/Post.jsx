import { useQueries } from "react-query";
import PostApi from "../services/PostApi";
import Image from "../../../components/Image";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import UserAccount from "../../../components/UserAccount";
import { useContext, useEffect, useRef, useState } from "react";
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

export default function ({ id }) {
  const [params, setParams] = useSearchParams()
  const [create, setCreate] = useState(params.get('open') == id)
  const ref = useRef()
  const { user } = useContext(CommonContext)
  useEffect(() => {
    document.body.style.overflow = (create) ? 'hidden' : 'auto'
  }, [create])
  const query = useQueries([
    {
      queryKey: ['post', id],
      queryFn: () => PostApi.getById(id)
    }
  ])
  if (query.some(e => e.isError || e.isLoading)) return <></>
  const post = query[0].data
  return <PostContext.Provider value={{ setCreate: setCreate, post: post, }}>
    {(create) && <div onClick={e => { if (!ref.current.contains(e.target)) setCreate(false) }} className="fixed left-0 top-0 bg-black_trans w-screen h-screen z-20"></div>}
    <div ref={ref} className={`max-w-[90%] max-h-[80%] max-sm:min-w-full max-sm:min-h-full fixed left-1/2 -translate-x-1/2 top-1/2 ${create ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-all duration-500 z-20  overflow-x-auto`}>
      <div className="card flex flex-col gap-5 relative">
        <div className="flex gap-5 p-5 items-center justify-between sticky top-0 z-20 bg-red_0 text-white_0">
          <UserAccount id={post.user} />
          <div>Vào {parseDate(post.createdAt)}</div>
          <IoCloseCircle onClick={() => setCreate(false)} className="w-8 h-8" />
        </div>
        <div className="p-5 flex flex-col gap-2">
          <div className=" card_1 p-5 flex flex-col gap-2">
            <div className=" whitespace-pre-line">{post.content}</div>
            {post.images.map(e => <div key={e}><Image id={e} /></div>)}
          </div>
          <div className="flex justify-between">
            <LikePost />
            <CommentPost />
            <SharePost />
          </div>
          <CreateComment />
          <hr />
          <Comments />
        </div>
      </div>
    </div>
    <div className="card p-5 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <UserAccount id={post.user} />
        {user._id == post.user &&
          <div className="group relative">
            <BsThreeDots className="w-8 h-8"/>
            <div className=" absolute rounded-lg right-0 transition-all duration-500 w-max max-h-0 overflow-hidden bg-white_1 group-hover:max-h-screen">
              <div className="flex flex-col">
                <DeletePost />
                <UpdatePost />
              </div>
            </div>
          </div>
        }
      </div>
      <div>Vào {parseDate(post.createdAt)}</div>
      <div onClick={() => setCreate(true)} className=" card_1 p-5 flex flex-col gap-2">
        <div className=" whitespace-pre-line">{post.content}</div>
        {post.images[0] && <Image id={post.images[0]} />}
      </div>
      <div className="flex justify-between">
        <LikePost />
        <CommentPost />
        <SharePost />
      </div>
    </div>
  </PostContext.Provider>
}  