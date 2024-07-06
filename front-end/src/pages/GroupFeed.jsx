import { useQuery } from "react-query"
import { GroupApi } from "../features/group"
import { useUser } from "../hooks/user"
import { Post } from "../features/post"
import { useRef,  } from "react"

export default function GroupFeed(params) {
  const { user } = useUser()
  const query = useQuery({
    queryKey: ['group_posts',  user._id],
    queryFn: () => GroupApi.getPosts({})
  })
  const ref = useRef()

  if(query.isLoading || query.isError) return <></>

  return <div className='flex flex-col gap-3'>
    {query.data.map(e => <div key={e._id}><Post id={e._id} /></div>)}
    <div ref={ref}>Loading more posts</div>
  </div>
}
