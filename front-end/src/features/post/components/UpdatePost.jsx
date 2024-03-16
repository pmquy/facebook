import { useContext, useEffect, useRef, useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { Button, FileInput, Textarea } from '../../../components/ui'
import PostApi from '../services/PostApi'
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import CommonContext from '../../../store/CommonContext'
import { IoCloseCircle } from "react-icons/io5";
import { useQueryClient } from 'react-query'
import PostContext from '../store/PostContext'

export default function () {
  const { user } = useContext(CommonContext)
  const {post} = useContext(PostContext)
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const queryClient = useQueryClient()
  const ref = useRef(), contentRef = useRef(), fileRef = useRef()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const handleCreatePost = () => {
    const formData = new FormData()
    if(contentRef.current.value)
      formData.append('content', contentRef.current.value)
    for(let i = 0; i < fileRef.current.files.length; i++) {
      formData.append('images', fileRef.current.files[i])
    }
    PostApi.updateById(post._id, formData)
      .then(() => {
        setOpen(false)
        queryClient.invalidateQueries(['post', post._id])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className=''>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`z-10 top-0 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    <div ref={ref} className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-10 ${open ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-all duration-500 card p-5 w-[90%] max-h-screen max-sm:w-screen overflow-y-auto max-w-[500px] flex flex-col gap-5`}>
      <IoCloseCircle onClick={() => setOpen(false)} className='w-8 h-8 absolute right-5 top-5' />
      <UserAccount id={user._id} />
      <Textarea defaultValue={post.content} autoFocus={true} ref={contentRef} />
      <FileInput onChange={e => setImages([...e.target.files].map(e => URL.createObjectURL(e)))} ref={fileRef} accept={'image/*'}>Tải ảnh lên</FileInput>
      {images.map((e, i) => <img key={i} src={e} className='rounded-xl'></img>)}
      <Button onClick={handleCreatePost} className={'m-auto'}>Xong</Button>
    </div>
    <div onClick={() => setOpen(true)} className="btn hover:bg-white_2 p-2 rounded-lg">Chỉnh sửa</div>
  </div>
}