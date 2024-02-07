import { useContext, useMemo } from 'react'
import { useQueries, useQueryClient } from 'react-query'
import CommonContext from '../../../store/CommonContext'
import api from '../services/api'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui'
import {toast} from 'react-toastify'

export default function () {
  const { user, users } = useContext(CommonContext)
  const queryClient = useQueryClient()
  const query = useQueries([
    {
      queryKey: ['friends', user._id],
      queryFn: () => api.get()
    }
  ])

  const { arr } = useMemo(() => {
    let arr
    if (query.some(e => e.isError || e.isLoading)) return { arr }
    const temp = query[0].data.map(e => e.sender == user._id ? e.receiver : e.sender)
    arr = users.filter(e => !temp.includes(e._id) && e._id != user._id)
    return { arr }
  }, [query[0].data])

  if (query.some(e => e.isError || e.isLoading)) return <></>

  const handleCreate = id => {    
    api.create(id)
      .then(() => {                        
        queryClient.invalidateQueries(['friends'])          
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div>
    <div className='card flex flex-col gap-5'>
      <div className='text-1 text-xl'>Gợi ý kết bạn</div>
      {arr.map(e => <div key={e._id} className='flex gap-5 items-center justify-between'>
        <Link to={'/user/' + e._id}>{e.firstName + ' ' + e.lastName}</Link>
        <Button onClick={() => handleCreate(e._id)}>Thêm bạn bè</Button>
      </div>)}
    </div>
  </div>
}