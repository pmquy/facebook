import { useQueries } from 'react-query'
import api from '../services/api'
import {Button} from '../../../components/ui'
import {File} from '../../../components'
import { useUser } from '../../../hooks/user'

export default function ({userId}) {  
  const {user} = useUser()

  const query = useQueries([
    {
      queryKey : ['user', userId],
      queryFn : () => api.getById(userId),
    }
  ])
  if(query.some(e => e.isLoading || e.isError)) return <></>

  const user1 = query[0].data


  return <div className='card dark:card-black p-5 flex flex-col gap-5'>
    <div>{user1.firstName + ' ' + user1.lastName}</div>
    <File id={user1.avatar} needToNavigate={true} className={'w-96 h-96 object-cover rounded-full'}/>
    {user && user1._id != user._id && <Button className={'btn-teal dark:btn-grey m-auto w-max'}>Kết bạn</Button>}
  </div>
}