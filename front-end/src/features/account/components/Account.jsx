import { useQueries } from 'react-query'
import api from '../services/api'
import { useContext } from 'react'
import CommonContext from '../../../store/CommonContext'
import {Button} from '../../../components/ui'
import Image from '../../../components/Image'

export default function ({userId}) {  
  const {user} = useContext(CommonContext)

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
    <Image id={user1.avatar} className={'w-96 h-96 object-cover rounded-full'}/>
    {user && user1._id != user._id && <Button className={'btn-teal dark:btn-grey m-auto w-max'}>Kết bạn</Button>}
  </div>
}