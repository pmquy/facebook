import {useQuery} from 'react-query'
import GameApi from '../services/api'
import { Link } from 'react-router-dom'
import { useUser } from '../../../hooks/user'

export default function () {
  
  const {user} = useUser()

  const query = useQuery({
    queryKey : ['carogames', user._id],
    queryFn : () => GameApi.get()
  })
  
  if(query.isError || query.isLoading) return <></>

  return <div className='flex flex-col gap-5'>
    {query.data.map(e => <Link to={'/carogames/' + e._id}>{e._id}</Link>)}
  </div>
}