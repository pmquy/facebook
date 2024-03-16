import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query"
import Comment from './Comment'
import PostContext from '../store/PostContext'
import CommentContext from '../store/CommentContext'
import { useContext } from 'react'

export default function () {
  const postContext = useContext(PostContext)
  const commentContext = useContext(CommentContext)
  const query = useQuery({
    queryKey: ['comments', { post: postContext.post._id, comment: commentContext ? commentContext.comment._id : '' }],
    queryFn: () => CommentApi.get({ comment: commentContext ? commentContext.comment._id : '', post: postContext.post._id })
  })

  if (query.isError || query.isLoading) return <></>

  return <div className={`flex flex-col gap-3 ${commentContext ? 'pl-8 border-l-2 border-red_0' : ''}`}>
    {query.data.map((e, i) => <div key={e._id}><Comment id={e._id} /></div>)}
  </div>
}