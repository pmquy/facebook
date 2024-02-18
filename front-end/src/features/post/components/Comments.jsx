import CommentApi from '../services/CommentApi'
import { useQuery } from "react-query"
import Comment from './Comment'

export default function ({ id }) {

  const query = useQuery({
    queryKey: ['commentposts', id],
    queryFn: () => CommentApi.get({ post: id })
  })

  if (query.isError || query.isLoading) return <></>

  return <div className="flex flex-col gap-3">
    {query.data.map(e => <Comment comment={e}/>)}
  </div>
}