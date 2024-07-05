import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Textarea } from '../../../components/ui'
import PostApi from '../services/PostApi'
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import { IoCloseCircle } from "react-icons/io5";
import { useQueries, useQueryClient } from 'react-query'
import PostContext from '../store/PostContext'
import Upload from '../../../components/Upload'
import FileApi from '../../../services/file'
import { useUser } from '../../../hooks/user'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const { user } = useUser()
  const { post } = useContext(PostContext)
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const queryClient = useQueryClient()
  const ref = useRef(), contentRef = useRef()
  const {headerRef} = useContext(CommonContext)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    headerRef.current.style['z-index'] = open ? 5 : 10
  }, [open])

  const query = useQueries(post.files.map(e => {
    return {
      queryKey: ['file', e],
      queryFn: () => FileApi.getFileById(e).then(data => new File([new Uint8Array(data.data.data)],data.name, { type: data.type }))
    }
  }))

  useEffect(() => {
    if(query.every(e => !e.isError && !e.isLoading)) setFiles(query.map(e => e.data))
  }, [query.every(e => !e.isError && !e.isLoading)])


  if(query.some(e => e.isError || e.isLoading)) return <></>

  const handleUpdatePost = () => {
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    files.forEach(e => formData.append('files', e))
    console.log(files)
    PostApi.updateById(post._id, formData)
      .then(() => {
        setOpen(false)
        queryClient.invalidateQueries(['post', post._id])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className=''>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={` top-0 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    <div ref={ref} className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-[1] ${open ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-[transform] duration-500 card dark:card-black p-5 w-[90%] max-h-screen max-sm:w-screen overflow-y-auto max-w-[500px] flex flex-col gap-5 text-black`}>
      <IoCloseCircle onClick={() => setOpen(false)} className='w-10 h-10 absolute right-5 top-5 btn-teal dark:btn-grey' />
      <UserAccount id={user._id} />
      <div className="border-2 border-teal p-2 rounded-lg">
        <Textarea defaultValue={post.content} placeholder={'Viết nội dung'} className={'w-full bg-white dark:bg-black'} autoFocus={true} ref={contentRef} />
        <Upload files={files} setFiles={setFiles}/>
      </div>
      <Button onClick={handleUpdatePost} className={'m-auto btn-teal dark:btn-grey'}>Xong</Button>
    </div>
    <div onClick={() => setOpen(true)} className="p-2 btn">Chỉnh sửa</div>
  </div>
}