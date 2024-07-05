import { useContext, useEffect, useRef, useState } from 'react'
import { Button, FileInput, Input } from '../../../components/ui'
import GroupApi from '../services/GroupApi'
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import { IoCloseCircle } from "react-icons/io5";
import { useQueryClient } from 'react-query'
import { useUser } from '../../../hooks/user'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const { user } = useUser()
  const { headerRef } = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState()
  const queryClient = useQueryClient()
  const ref = useRef(), nameRef = useRef(), descriptionRef = useRef()

  useEffect(() => {
    headerRef.current.style['z-index'] = open ? 5 : 10
  }, [open])


  const handleCreateGroup = () => {
    const formData = new FormData()
    formData.append('name', nameRef.current.value)
    formData.append('description', descriptionRef.current.value)
    formData.append('avatar', image)
    GroupApi.create(formData)
      .then(() => {
        nameRef.current.value = ''
        descriptionRef.current.value = ''
        setImage(null)
        setOpen(false)
        queryClient.invalidateQueries(['groups'])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }
  

  return <div>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`z-10 top-0 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    <div ref={ref} className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-10 ${open ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-all duration-500 card dark:card-black p-5 w-[90%] max-h-screen max-sm:w-screen overflow-y-auto max-w-[500px] flex flex-col gap-5`}>
      <IoCloseCircle onClick={() => setOpen(false)} className='w-10 h-10 absolute right-5 top-5 btn-teal dark:btn-grey' />
      <UserAccount id={user._id} />
      <div className="flex gap-5 items-center justify-between">
        <div className='text-1'>Tên nhóm</div>
        <Input className="bg-white border-teal border-2 dark:bg-black" ref={nameRef} />
      </div>
      <div className="flex gap-5 items-center justify-between">
        <div className='text-1'>Mô tả</div>
        <Input className="bg-white border-teal border-2 dark:bg-black" ref={descriptionRef} />
      </div>
      {image && <img src={URL.createObjectURL(image)} className='w-72 rounded-full h-72 object-cover m-auto'></img>}
      <div className="m-auto w-max"><FileInput className="btn-teal dark:btn-grey" accept={'image/*'} onChange={e => setImage(e.target.files[0])}>Thêm ảnh nhóm</FileInput></div>
      <Button onClick={handleCreateGroup} className={'m-auto btn-teal dark:btn-grey'}>Tạo</Button>
    </div>
    <Button onClick={() => setOpen(true)}>Tạo nhóm mới</Button>
  </div>
}