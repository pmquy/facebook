import { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { FileDetail } from "../components";
import { CommentPost, CommentPostDetail, Comments, LikePost, LikePostDetail, Live, PostApi, PostContext, SharePost, Vote } from "../features/post";
import CreateComment from "../features/post/components/CreateComment";
import { getDiff } from "../utils/parseDate";
import MainNavBar from "../components/MainNavBar";
import { GroupAccount } from "../features/group";
import { Button } from "@mui/material";

export default function Post() {
  const params = useParams()
  const [index, setIndex] = useState(0)
  const id = params.id
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => PostApi.getById(id)
  })
  if (query.isLoading || query.isError) return <></>
  const post = query.data
  console.log(index)

  return <div className="flex bg-background gap-5 sm:px-3 py-5 max-w-[1300px] mx-auto max-lg:flex-col">

    <div className="basis-1/4">
      <MainNavBar />
    </div>

    <div className="basis-3/4 overflow-hidden">
      <PostContext.Provider value={{ post: post }}>
        <div className="flex flex-col gap-5 relative bg-surface shadow text-onSurface rounded-md p-5">
          <div>Ngày đăng: {new Date(post.createdAt).toLocaleString()}</div>
          {post.content && <div className=" whitespace-pre-line text-justify font-semibold text-xl">{post.content}</div>}

          {!!post.files.length && <div className="relative rounded-md overflow-hidden">
            <Link to={`/files/${post.files[index]}`}><FileDetail id={post.files[index]} /></Link>
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <Button disabled={index === 0} variant="contained" onClick={() => setIndex((index - 1 + post.files.length) % post.files.length)}>
                <IoMdArrowDropleft className="w-6 h-6" />
              </Button>
            </div>

            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <Button disabled={index === post.files.length - 1} variant="contained" onClick={() => setIndex((index + 1) % post.files.length)}>
                <IoMdArrowDropright className="w-6 h-6" />
              </Button>
            </div>
          </div>}

          {post.type == 'Live' && <div><Live post={post} /></div>}

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
          {post.type == 'Vote' && <div className=""><Vote post={post} /></div>}

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

          <CreateComment />
          <Comments q={{ post: id, comment: "" }} />

        </div>
      </PostContext.Provider>
    </div>

  </div>
};
