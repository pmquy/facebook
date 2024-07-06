import { memo, useContext, useEffect, useRef, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FilePreview } from "../../../components";
import UserAccount from "../../../components/UserAccount";
import CommonContext from "../../../store/CommonContext";
import { getDiff, parseDate } from '../../../utils/parseDate';
import { GroupAccount } from '../../group';
import PostContext from '../store/PostContext';
import { CommentPost, CommentPostDetail } from "./CommentPost";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { LikePost, LikePostDetail } from "./LikePost";
import Live from "./Live";
import SettingPost from "./SettingPost";
import SharePost from "./SharePost";
import Vote from "./Vote";
import { useQuery } from "react-query";
import PostApi from "../services/PostApi";
import { Dialog, IconButton } from '@mui/material'

export default memo(function Post({ id, detail = false, onClose }) {
  const [open, setOpen] = useState(false)
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => PostApi.getById(id)
  })

  if (query.isLoading || query.isError) return <></>

  const post = query.data

  return <PostContext.Provider value={{ setCreate: setOpen, post: post, }}>

    {!detail && <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={` bg-surface text-onSurface rounded-md w-[90%] max-h-[80%] sm:max-w-[900px] max-sm:w-screen max-sm:max-h-screen fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  overflow-y-auto`}>
        <Post id={id} detail={true} onClose={() => setOpen(false)} />
      </div>
    </Dialog>}

    <div className="flex flex-col bg-surface text-onSurface shadow rounded-md">

      <div className={`flex flex-col gap-2  ${detail ? 'sticky z-10 top-0 bg-primary text-onPrimary p-3' : 'px-5 pt-5'} `}>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center flex-wrap">
            <img src={post.user.avatar.url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="flex gap-2 font-semibold items-center">
                <Link to={`/users/${post.user._id}`}>{post.user.firstName + ' ' + post.user.lastName}</Link>
                <div>&#x2022;</div>
                <div className="text-sm">{getDiff(post.createdAt)}</div>
              </div>
              <div className="text-sm">Web Developer at Webestica</div>
            </div>
            {post.group && <IoMdArrowDropright className=" w-6 h-6" />}
            {post.group && <GroupAccount group={post.group} />}
          </div>
          {detail ? <IconButton onClick={() => onClose(false)}><IoClose className="text-onPrimary" /></IconButton> : <SettingPost post={post} />}
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className=" whitespace-pre-line text-justify">{post.content}</div>
        {!!post.files.length && <Link to={`/posts/${post._id}`}>
          <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }} className="grid gap-2">{post.files.map(e => <div className="w-full h-full rounded-md overflow-hidden" key={e}><FilePreview id={e} /></div>)}</div>
        </Link>}
        {post.type === 'Live' && <Link to={`/posts/${post._id}`}><Live post={post} detail={false} /></Link>}

        {post.type === 'Vote' && <Vote post={post} />}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <LikePostDetail id={post._id} />
            <CommentPostDetail id={post._id} />
          </div>
          <div className="flex gap-2">
            <LikePost id={post._id} detail={false} />
            <div onClick={() => setOpen(!detail)}><CommentPost id={post._id} /></div>
            <div className="grow"></div>
            <SharePost id={post._id} />
          </div>
        </div>


        {detail && <div className="flex flex-col gap-5">
          <CreateComment />
          <Comments q={{ post: post._id, comment: "" }} />
        </div>}
      </div>


    </div>
  </PostContext.Provider>
})