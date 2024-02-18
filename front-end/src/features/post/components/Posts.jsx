import { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import CommonContext from '../../../store/CommonContext'
import PostApi from '../services/PostApi'
import Post from './Post'

export default function () {
  const { user } = useContext(CommonContext)
  const [ids, setIds] = useState([])
  const ref = useRef()
  const query = useQuery({
    queryKey: ['posts', user._id],
    queryFn: () => PostApi.get()
  })
  useEffect(() => {
    if(query.isError || query.isLoading) return
    const observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {        
        setIds(ids => [...ids, ...query.data.slice(ids.length, ids.length + 3)])
      }
    })
    if(ref.current) observer.observe(ref.current)
    return () => {
      if(ref.current) observer.unobserve(ref.current)
    }
  }, [query.isError , query.isLoading])
  if (query.isError || query.isLoading) return <></>
  return <div className='flex flex-col gap-5 my-5'>
    {ids.map(e => <Post id={e._id} />)}
    <div ref={ref}>Loading more posts</div>
  </div>
}