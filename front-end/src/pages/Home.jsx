import { useQuery } from 'react-query'
import { CreatePost, PostApi, Post } from '../features/post'

export default function () {

  const query = useQuery({
    queryKey: ['posts'],
    queryFn: () => PostApi.get({})
  })

  if (query.isError || query.isLoading) return <></>

  return <div className='overflow-hidden'>
    <div className=' w-[90%] m-auto max-w-[700px] max-sm:w-screen flex flex-col gap-3'>
      <CreatePost />
      {query.data.map(e => <div key={e._id}><Post id={e._id} /></div>)}
      <div>Loading more posts</div>
    </div>
  </div>
}