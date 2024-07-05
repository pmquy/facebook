import UserAccount from "../../../components/UserAccount";
import { File } from "../../../components";
import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query";
import {  useState } from "react";
import CreateComment from './CreateComment'
import Comments from './Comments'
import LikeComment from "./LikeComment";
import CommentContext from '../store/CommentContext'
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";
import { FaReply } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useUser } from "../../../hooks/user";

export default function ({ id }) {
  const { user } = useUser()
  const [create, setCreate] = useState(false)
  const [update, setUpdate] = useState(false)
  const query = useQuery({
    queryKey: ['comment', id],
    queryFn: () => CommentApi.getById(id),
  })
  if (query.isLoading || query.isError) return <div></div>
  const comment = query.data
  return <CommentContext.Provider value={{ setCreate: setCreate, setUpdate: setUpdate, comment: comment }}>
    <div className={`flex flex-col`}>
      <div className="relative">
        <UserAccount id={comment.user} />
        {comment.comment && <div className=" absolute left-0 top-1/2 -tranlsate-y-1/2 border-teal -translate-x-full w-8 border-t-2"></div>}
      </div>
      {update ? <div className="my-2"><UpdateComment /></div> :
        <div className="flex mt-2 flex-col gap-2 p-3 my-2 card-teal w-max text-white">
          <div className=" whitespace-pre-line">{comment.content}</div>
          {comment.files.map(e => <div className="max-w-96" key={e}><File needToNavigate={true} id={e} /></div>)}
          <div className="flex mt-2 gap-3 items-center">
            <LikeComment />
            <FaReply className=" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1" color="#EEEEEE" onClick={() => setCreate(true)} />
            {comment.user == user._id && <DeleteComment />}
            {comment.user == user._id && <MdEdit onClick={() => setUpdate(true)} className=" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1" color="#EEEEEE" />}
          </div>
        </div>
      }
      <div className="border-l-2 border-teal flex flex-col gap-2">
        {create && <CreateComment />}
        <Comments />
      </div>
    </div>
  </CommentContext.Provider>
}