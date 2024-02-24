import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query"
import Comment from './Comment'

export default function ({ post, comment }) {
  
  const query = useQuery({
    queryKey: ['comments', {post : post, comment : comment}],
    queryFn: () => CommentApi.get({comment : comment, post : post})
  })

  if (query.isError || query.isLoading) return <></>

  return <div className={`flex flex-col gap-3 ${comment ? 'pl-8 border-l-2 border-red_0' : ''}`}>    
    {query.data.map((e, i ) => <Comment comment={e}/>)}
  </div>
}