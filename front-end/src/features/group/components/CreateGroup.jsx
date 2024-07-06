import { Dialog, IconButton, Button, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { FileInput } from '../../../components/ui'
import UserAccount from '../../../components/UserAccount'
import { useUser } from '../../../hooks/user'
import GroupApi from '../services/GroupApi'

export default function () {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState()
  const queryClient = useQueryClient()
  const nameRef = useRef(), descriptionRef = useRef()


  const handleCreateGroup = () => {
    const formData = new FormData()
    formData.append('name', nameRef.current.value)
    formData.append('description', descriptionRef.current.value)
    if(image) formData.append('avatar', image)
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
    <Dialog open={open} onClose={() => setOpen(false)} >
      <div className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-10 -translate-y-1/2 bg-surface text-onSurface rounded-md p-5 w-[90%] max-h-screen max-sm:w-screen overflow-y-auto max-w-[500px] flex flex-col gap-5`}>
        <div className="absolute right-5 top-5">
          <IconButton onClick={() => setOpen(false)} color='primary'><MdClose className='w-6 h-6' /></IconButton>
        </div>
        <UserAccount id={user._id} />
        <TextField variant='outlined' className="w-full" label='Tên' inputRef={nameRef} />
        <TextField variant='outlined' className="w-full" label='Mô tả' inputRef={descriptionRef} />
        {image && <img src={URL.createObjectURL(image)} className='w-72 rounded-full h-72 object-cover m-auto'></img>}
        <div className="m-auto w-max"><FileInput className=" bg-primary text-onPrimary p-2 btn rounded-md font-semibold" accept={'image/*'} onChange={e => setImage(e.target.files[0])}>Thêm ảnh nhóm</FileInput></div>
        <Button onClick={handleCreateGroup} className={'m-auto bg-primary text-onPrimary p-2 btn rounded-md font-semibold'}>Tạo</Button>
      </div>
    </Dialog >
    <Button variant='outlined' onClick={() => setOpen(true)}>Tạo nhóm mới</Button>
  </div >
}