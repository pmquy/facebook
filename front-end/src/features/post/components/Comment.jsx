import UserAccount from "../../../components/UserAccount";
import Image from '../../../components/Image'
import Video from '../../../components/Video'
import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query";
import { useContext, useState } from "react";
import CreateComment from './CreateComment'
import Comments from './Comments'
import LikeComment from "./LikeComment";
import CommonContext from "../../../store/CommonContext";
import CommentContext from '../store/CommentContext'
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";

export default function ({ id }) {
  const { user } = useContext(CommonContext)
  const [create, setCreate] = useState(false)
  const [update, setUpdate] = useState(false)
  const query = useQuery({
    queryKey: ['comment', id],
    queryFn: () => CommentApi.getById(id),
  })
  if (query.isLoading || query.isError) return <></>
  const comment = query.data
  return <CommentContext.Provider value={{ setCreate: setCreate, setUpdate: setUpdate, comment: comment }}>
    <div className={`flex flex-col`}>
      <div className="relative">
        <UserAccount id={comment.user} />
        {comment.comment && <div className=" absolute left-0 top-1/2 -tranlsate-y-1/2 border-red_0 -translate-x-full w-8 border-t-2"></div>}
      </div>
      {update ? <UpdateComment /> :
        <div className="flex mt-2 flex-col gap-2 card_1 p-5">
          <div className=" whitespace-pre-line">{comment.content}</div>
          {comment.images.map(e => <div className="w-64" key={e._id}><Image id={e} /></div>)}
          {comment.videos.map(e => <div className="w-64" key={e._id}><Video id={e} /></div>)}
        </div>}
      <div className="flex mt-2 gap-5 items-center">
        <LikeComment />
        <div className="btn" onClick={() => setCreate(true)}>Phản hồi</div>
        {comment.user == user._id && <DeleteComment />}
        {comment.user == user._id && <div onClick={() => setUpdate(true)} className="btn">Chỉnh sửa</div>}
      </div>
      <div className="mt-2"></div>
      {create && <CreateComment />}
      <Comments />
    </div>
  </CommentContext.Provider>
}