import { useContext, useRef } from 'react'
import { useQuery } from 'react-query'
import { GroupContext } from '../../group'
import PostApi from '../services/PostApi'
import Post from './Post'

export default function () {
  const groupContext = useContext(GroupContext)
  const ref = useRef()
  const query = useQuery({
    queryKey: ['posts', groupContext ? { group: groupContext.group._id } : {}],
    queryFn: () => PostApi.get(groupContext ? { group: groupContext.group._id } : {})
  })
  if (query.isError || query.isLoading) return <></>

  return <div className='flex flex-col gap-5 my-5'>
    {query.data.map(e => <div key={e._id}><Post id={e._id} /></div>)}
    <div ref={ref}>Loading more posts</div>
  </div>
}