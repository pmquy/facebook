import { useContext, useRef, useState } from "react";
import { Button, Input } from '../../../components/ui'
import CommonContext from '../../../store/CommonContext'
import GroupChatApi from '../services/groupChat'
import {toast} from 'react-toastify'
import { useQueryClient } from "react-query";
import UserAccount from "../../../components/UserAccount";

export default function () {
  const [ids, setIds] = useState(new Set())
  const [open, setOpen] = useState(false)
  const { users, user } = useContext(CommonContext)
  const ref = useRef(), nameRef = useRef()
  const queryClient = useQueryClient()

  const handleCreate = () => {
    GroupChatApi.create({
      name : nameRef.current.value,
      users : [...ids]
    })
      .then(() => {
        queryClient.invalidateQueries(['groupchats', user._id])
        setOpen(false)
        setIds([])
      })
      .catch(err => toast(err.message, {type : 'error'}))
  }

  return <div>    
    {open && <div onClick={(e) => {if(!ref.current.contains(e.target)) setOpen(false)}} className='fixed z-20 left-0 top-0 w-screen h-screen bg-black_trans'>
      <div ref={ref} className=" flex flex-col gap-5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-h-screen w-[90%] max-sm:w-screen overflow-y-auto card p-5">
        <div className="flex gap-5 items-center">
          <div className="text-1">Tên nhóm</div>          
          <Input className={'flex-grow'} ref={nameRef} placeHolder={'Tên nhóm'}/>
        </div>
        {users.map(e => <div className={e._id == user._id ? 'hidden' : 'block'}>
          <div className="flex gap-5 justify-between">
            <UserAccount id={e._id}/>
            {!ids.has(e._id) && <Button className={' btn-grey'} onClick={() => {
              ids.add(e._id)
              setIds(new Set(ids))
            }}>Thêm</Button>}
            {ids.has(e._id) && <Button className={' btn-grey'} onClick={() => {
              ids.delete(e._id)
              setIds(new Set(ids))
            }}>Loại</Button>}
          </div>
        </div>)}
        <Button onClick={handleCreate} className={'btn-teal m-auto'}>Tạo nhóm chat</Button>
        <Button onClick={() => setOpen(false)} className={'btn-teal m-auto'}>Thoát</Button>
      </div>
    </div>}
    <Button className={'btn-teal m-auto'} onClick={() => setOpen(true)}>Tạo nhóm mới</Button>
  </div>
}