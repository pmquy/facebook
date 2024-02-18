import { useContext, useEffect, useRef, useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { Button, FileInput, Textarea } from '../../../components/ui'
import PostApi from '../services/PostApi'
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import CommonContext from '../../../store/CommonContext'
import { IoCloseCircle } from "react-icons/io5";
import { useQueryClient } from 'react-query'

export default function () {
  const { user } = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState()
  const queryClient = useQueryClient()
  const ref = useRef(), contentRef = useRef(), fileRef = useRef()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const handleCreatePost = () => {
    const formData = new FormData()
    formData.append('content', contentRef.current.value)
    if (fileRef.current.files[0]) {
      formData.append('image', fileRef.current.files[0])
    }
    PostApi.create(formData)
      .then(() => {
        setOpen(false)
        queryClient.invalidateQueries(['posts', user._id])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }  

  return <div className='flex gap-5 items-center p-5 bg-white_0 box-shadow rounded-lg'>
    <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`${open ? 'block' : 'hidden'} z-20 top-0 left-0 w-screen h-screen fixed bg-black_trans`}>
      <div ref={ref} className='left-1/2 -translate-x-1/2 top-1/2 absolute -translate-y-1/2 card p-5 w-[90%] max-h-[80%] overflow-y-auto max-w-[500px] flex flex-col gap-5'>
        <IoCloseCircle onClick={() => setOpen(false)} className='w-8 h-8 absolute right-5 top-5' />
        <UserAccount id={user._id} />
        <Textarea autoFocus={true} ref={contentRef} />
        <FileInput onChange={e => setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)} ref={fileRef} accept={'image/*'}>Tải ảnh lên</FileInput>
        {image && <img src={image} className='rounded-xl'></img>}
        <Button onClick={handleCreatePost} className={'m-auto'}>Đăng</Button>        
      </div>
    </div>
    <MdAccountCircle className='w-8 h-8' />
    <div onClick={() => setOpen(true)} className=' bg-white_1 p-2 rounded-xl flex-grow hover:bg-white_2'>Bạn đang nghĩ gì thế</div>
  </div>
}