import { useContext } from 'react'
import {useQueries} from 'react-query'
import CommonContext from '../../../store/CommonContext'
import PostApi from '../services/PostApi'
import Post from './Post'

export default function () {
  const {user} = useContext(CommonContext)  
  const query = useQueries([
    {
      queryKey : ['posts', user._id],
      queryFn : () => PostApi.get()
    },    
  ])
  if(query.some(e => e.isError || e.isLoading)) return <></>  
  return <div className='flex flex-col gap-5 my-5'>
    {query[0].data.map(e => <Post id={e._id}/>)}
  </div>
}