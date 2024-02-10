import { useQueries, useQueryClient } from "react-query";
import PostApi from "../services/PostApi";
import Image from "../../../components/Image";
import PostAction from "./PostAction";
import Comments from "./Comments";
import CreateComment from "./CommentForm";
import UserAccount from "../../../components/UserAccount";
import { toast } from "react-toastify";
import { useContext } from "react";
import CommonContext from "../../../store/CommonContext";
import { Button } from "../../../components/ui";
import {parseDate} from '../../../utils/parseDate'

export default function ({id}) {
  const {user} = useContext(CommonContext)
  const queryClient = useQueryClient()
  const query = useQueries([
    {
      queryKey : ['post', id],
      queryFn : () => PostApi.getById(id)
    }
  ])
  
  if(query.some(e => e.isError || e.isLoading)) return <></>
  
  const post = query[0].data  
  
  const handleDelete = () => {
    PostApi.deleteById(id)
      .then(() => queryClient.invalidateQueries(['posts', user._id]))
      .catch(err => toast(err.message, {type : 'error'}))
  }

  return <div className="card flex flex-col gap-5 relative"> 
    {user._id == post.user && <Button onClick={handleDelete} className={'absolute right-5 top-5'}>Xóa</Button>}    
    <UserAccount id={post.user}/>
    <div>Vào {parseDate(post.createdAt)}</div>
    <div className=" card_1 flex flex-col gap-5">
      <div>{post.content}</div>
      {post.image && <Image id={post.image}/>}
    </div>
    <PostAction id={post._id}/>
    <CreateComment id={post._id}/>
    <hr />
    <Comments id={post._id}/>
  </div>
}  