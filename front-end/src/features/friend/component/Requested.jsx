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

  const { arr, fr } = useMemo(() => {
    let arr, fr
    if (query.some(e => e.isError || e.isLoading)) return { arr, fr }
    arr = query[0].data.filter(e => e.receiver == user._id && e.status == 0).map(e => e.sender)
    fr = arr.map(e => users.filter(t => t._id == e)[0])
    return { arr, fr }
  }, [query[0].data])

  if (query.some(e => e.isError || e.isLoading)) return <></>

  const handleCancel = id => {
    api.cancel(id)
      .then(() => {
        queryClient.invalidateQueries(['friends'])        
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }
  
  const handelAccept = id => {
    api.accept(id)
      .then(() => {
        queryClient.invalidateQueries(['friends'])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div>
    <div className='card flex flex-col gap-5'>
      <div className='text-1 text-xl'>Các lời mời kết bạn</div>
      {arr.map((e, i) => <div key={e} className='flex gap-5 items-center justify-between'>
        <Link to={'/user/' + e}>{fr[i].firstName + ' ' + fr[i].lastName}</Link>
        <Button onClick={() => handelAccept(e)}>Chấp nhận</Button>
        <Button onClick={() => handleCancel(e)}>Từ chối</Button>
      </div>)}
    </div>
  </div>
}