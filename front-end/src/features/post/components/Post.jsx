import { Dialog, Divider, IconButton } from '@mui/material';
import { memo, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdArrowRight } from 'react-icons/md';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FilePreview } from "../../../components";
import { getDiff } from '../../../utils/parseDate';
import EventApi from '../services/EventApi';
import PostApi from "../services/PostApi";
import PostContext from '../store/PostContext';
import { CommentPost, CommentPostDetail } from "./CommentPost";
import Comments from "./Comments";
import CreateComment from "./CreateComment";
import { AttendEvent } from './Event';
import { LikePost, LikePostDetail } from "./LikePost";
import Live from "./Live";
import SettingPost from "./SettingPost";
import SharePost from "./SharePost";
import {Vote} from "./Vote";

function PostHeader({ post }) {
  return <div className=' @container w-full'>
    <div className="flex gap-2 @md:items-center @max-md:flex-col">
      <div className="flex gap-2 items-center">
        <img src={post.user.avatar.url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="flex gap-2 font-semibold items-center">
            <Link to={`/users/${post.user._id}`} className='heading'>{post.user.firstName + ' ' + post.user.lastName}</Link>
            <div>&#x2022;</div>
            <div className="text-sm">{getDiff(post.createdAt)}</div>
          </div>
          <div className="text-sm">Web Developer at Webestica</div>
        </div>
      </div>
      {post.group && <MdArrowRight className=" w-6 h-6 @max-md:hidden" />}
      {post.group && <div className="flex gap-2 items-center">
        <img src={post.group.avatar.url} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <Link to={`/groups/${post.group._id}`} className='heading'>{post.group.name}</Link>
          <div className="text-sm">Public group</div>
        </div>
      </div>}
    </div>
  </div>
}

function PostEmbed({ id }) {
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => PostApi.getById(id)
  })
  if (query.isLoading || query.isError) return <></>
  const post = query.data
  return <Link to={`/posts/${id}`} className="flex flex-col gap-3">
    <PostHeader post={post} />
    {post.content && <div className="whitespace-pre-line text-justify">{post.content}</div>}
    {!!post.files.length && <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }} className="grid gap-2">{post.files.map(e => <div className="w-full h-full rounded-md overflow-hidden" key={e}><FilePreview id={e} /></div>)}</div>}
    {post.type === 'Live' && <Live post={post} detail={true} />}
    {post.type === 'Vote' && <Vote post={post} />}
  </Link>
}

function EventEmbed({ id }) {
  const query = useQuery({
    queryKey: ['event', id],
    queryFn: () => EventApi.getById(id)
  })
  if (query.isLoading || query.isError) return <></>
  const event = query.data
  return <Link to={`/events/${id}`} className={`flex flex-col gap-3 relative`}>
    <img src={event.cover.url} alt="cover" className="w-full h-72 object-cover rounded-md" />
    <div className="absolute flex gap-10 items-center bottom-0 left-0 right-0 p-5 bg-linear-to-b from-transparent to-black">
      <div className=" overflow-hidden grow text-white ">
        <div className="text-xl font-semibold text-ellipsis overflow-hidden text-nowrap">{event.title}</div>
        <div className="text-sm">{new Date(event.time).toLocaleString()}</div>
      </div>
      <div className="shrink-0">
        <AttendEvent event={event} />
      </div>
    </div>
  </Link>
}

export default memo(function Post({ id, detail = false, onClose }) {
  const [open, setOpen] = useState(false)
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => PostApi.getById(id)
  })

  if (query.isLoading || query.isError) return <></>

  const post = query.data

  return <PostContext.Provider value={{ setCreate: setOpen, post: post }}>

    {!detail && <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={` bg-surface text-onSurface rounded-md w-[90%] max-h-[80%] sm:max-w-[900px] max-sm:w-screen max-sm:max-h-screen fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  overflow-y-auto`}>
        <Post id={id} detail={true} onClose={() => setOpen(false)} />
      </div>
    </Dialog>}

    <div className="flex flex-col bg-surface text-onSurface shadow rounded-md">

      <div className={`flex flex-col gap-2  ${detail ? 'sticky z-10 top-0 bg-primary text-onPrimary p-3' : 'px-5 pt-5'} `}>
        <div className="flex justify-between items-center">
          <PostHeader post={post} />
          {detail ? <IconButton onClick={() => onClose(false)}><IoClose className="text-onPrimary" /></IconButton> : <SettingPost post={post} />}
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className=" whitespace-pre-line text-justify">{post.content}</div>

        {post.ref && <div className='border-2 p-3'>
          {post.ref.type === "Post" && <PostEmbed id={post.ref.id} />}
          {post.ref.type === "Event" && <EventEmbed id={post.ref.id} />}
        </div>}

        {!!post.files.length && <Link to={`/posts/${post._id}`}>
          <div style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }} className="grid gap-2">{post.files.map(e => <div className="w-full h-full rounded-md overflow-hidden" key={e}><FilePreview id={e} /></div>)}</div>
        </Link>}

        {post.type === 'Live' && <Link to={`/posts/${post._id}`}><Live post={post} detail={false} /></Link>}

        {post.type === 'Vote' && <Vote post={post} />}

        <Divider />

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <LikePostDetail id={post._id} />
            <CommentPostDetail id={post._id} />
          </div>
          <div className="flex gap-2">
            <LikePost id={post._id} detail={false} />
            <div onClick={() => setOpen(!detail)}><CommentPost id={post._id} /></div>
            <div className="grow"></div>
            <SharePost id={post.ref ? post.ref.id : post._id} type={post.ref ? post.ref.type : "Post"} />
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