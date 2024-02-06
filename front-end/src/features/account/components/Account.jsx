import { useQueries } from 'react-query'
import api from '../services/api'
import { useContext } from 'react'
import UserContext from '../store/userContext'
import {Button} from '../../../components/ui'

export default function ({userId}) {  
  const {user} = useContext(UserContext)

  const query = useQueries([
    {
      queryKey : ['user', userId],
      queryFn : () => api.getById(userId),
    }
  ])
  if(query.some(e => e.isLoading || e.isError)) return <></>

  const user1 = query[0].data

  return <div className='card flex flex-col gap-5'>
    <div>Name : {user1.firstName + ' ' + user1.lastName}</div>
    {user && user1._id != user._id && <Button/>}
  </div>
}