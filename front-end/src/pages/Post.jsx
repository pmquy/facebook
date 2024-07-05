import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { LikePost, PostApi, CommentPost, SharePost, PostContext, Comments } from "../features/post";
import { File, UserAccount } from "../components";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { GroupAccount } from "../features/group";
import { parseDate } from "../utils/parseDate";
import CreateComment from "../features/post/components/CreateComment";
import { useState } from "react";

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

  return <PostContext.Provider value={{ setCreate: () => { }, post: post, }}>
    <div className=" fixed pt-16 h-screen w-screen top-0 left-0 flex gap-5">
      {!!post.files.length && <div className="basis-1/2 max-lg:hidden relative">
        <div className=" absolute w-full top-1/2 -translate-y-1/2">
          <File needToNavigate={true} id={post.files[index]} />
        </div>
        <IoMdArrowDropleft onClick={() => setIndex(index - 1 + post.files.length) % post.files.length} className="btn-teal w-10 h-10 absolute left-5 top-1/2 -translate-y-1/2" />
        <IoMdArrowDropright onClick={() => setIndex((index + 1) % post.files.length)} className="btn-teal w-10 h-10 absolute right-5 top-1/2 -translate-y-1/2" />
      </div>}

      <div className="flex flex-col gap-5 relative flex-grow overflow-y-auto bg-black">
        <div className="p-5 flex flex-col gap-2 sticky z-10 border-b-2 border-white top-0 bg-teal text-white">
          <div className="flex gap-5 justify-between">
            <div className="flex gap-2">
              <UserAccount id={post.user} />
              {post.group && <IoMdArrowDropright className=" w-8 h-8" />}
              {post.group && <GroupAccount id={post.group} />}
            </div>
          </div>
          <div>Vào {parseDate(post.createdAt)}</div>
        </div>
        <div className="flex flex-col gap-5 p-5">
          <div className=" whitespace-pre-line text-2xl">{post.content}</div>
          <div className=" flex flex-col gap-5 lg:hidden">
            {post.files.map(e => <div className=" max-w-96" key={e}><File id={e} needToNavigate={true} /></div>)}
          </div>
          <hr />
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
  </PostContext.Provider>
};
