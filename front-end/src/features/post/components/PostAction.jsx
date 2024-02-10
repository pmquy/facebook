import LikeAction from "./LikeAction";
import CommentAction from './CommentAction'
import ShareAction from './ShareAction'

export default function ({id}) {
  return <div className="flex justify-between">
    <LikeAction id={id}/>
    <CommentAction id={id}/>      
    <ShareAction id={id}/>
  </div>
}