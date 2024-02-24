import { useContext, useRef, useState } from 'react'
import GameApi from '../services/api'
import CommonContext from '../../../store/CommonContext'
import {toast} from 'react-toastify'
import {Button} from '../../../components/ui'
import { useNavigate } from 'react-router-dom'

export default function () {
  const {user, users} = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const navigate = useNavigate()
  
  const handleCreate = (id) => {
    GameApi.create({to : id})      
      .then(val => navigate('/carogames/' + val._id))
      .catch(err => toast(err.message, {type : 'error'})) 
  }

  return <div>
    {open && <div onClick={e => {if(!ref.current.contains(e.target)) setOpen(false)}} className='fixed z-20 top-0 left-0 w-screen h-screen bg-black_trans'>
      <div ref={ref} className='card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col gap-5'>
        {users.filter(e => e._id != user._id).map(e => <div className='flex gap-5 justify-between'>
          <div>{e.firstName + ' ' + e.lastName}</div>
          <Button onClick={() => handleCreate(e._id)}>Bắt đầu</Button>
        </div>)}
      </div>  
    </div>}
    <Button onClick={() => setOpen(true)}>Trò chơi mới</Button>
  </div>
}