import { useContext, useEffect, useRef, useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { Button, FileInput, Textarea } from '../../../components/ui'
import PostApi from '../services/PostApi'
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import CommonContext from '../../../store/CommonContext'
import { IoCloseCircle } from "react-icons/io5";
import { useQueryClient } from 'react-query'
import Image from '../../../components/Image'
import Upload from '../../../components/Upload'

export default function () {
  const { user } = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const queryClient = useQueryClient()
  const ref = useRef(), contentRef = useRef(), fileRef = useRef()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
  }, [open])

  const handleCreatePost = () => {
    const formData = new FormData()
    if (contentRef.current.value)
      formData.append('content', contentRef.current.value)
      images.forEach(e => formData.append('images', e))
      videos.forEach(e => formData.append('videos', e))
    PostApi.create(formData)
      .then(() => {
        setImages([])
        setVideos([])
        contentRef.current.value = ''
        setOpen(false)
        queryClient.invalidateQueries(['posts'])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className='flex card dark:card-black gap-5 items-center p-5'>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`z-10 top-0 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    <div ref={ref} className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-10 ${open ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-all duration-500 card dark:card-black p-5 w-[90%] max-h-screen max-sm:w-screen overflow-y-auto max-w-[500px] flex flex-col gap-5`}>
      <IoCloseCircle onClick={() => setOpen(false)} className='w-10 h-10 absolute right-5 top-5 btn-teal dark:btn-grey' />
      <UserAccount id={user._id} />
      <div className="border-2 border-teal p-2 rounded-lg">
        <Textarea placeholder={'Viết nội dung'} className={'w-full bg-white dark:bg-black'} autoFocus={true} ref={contentRef} />
        <Upload videos={videos} images={images} setImages={setImages} setVideos={setVideos}/>
      </div>
      <Button onClick={handleCreatePost} className={'m-auto btn-teal dark:btn-grey'}>Đăng</Button>
    </div>
    {user.avatar ? <Image needToNavigate={false} id={user.avatar} className={'min-w-8 min-h-8 max-w-8 max-h-8 object-cover rounded-full'} /> : <MdAccountCircle className='w-8 h-8' />}
    <div onClick={() => setOpen(true)} className='btn p-2 rounded-xl flex-grow border-2 border-teal'>Bạn đang nghĩ gì thế</div>
  </div>
}