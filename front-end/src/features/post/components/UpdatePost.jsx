import { useContext, useEffect, useRef, useState } from 'react'
import PostApi from '../services/PostApi'
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { useQueries, useQueryClient } from 'react-query'
import PostContext from '../store/PostContext'
import Upload from '../../../components/Upload'
import FileApi from '../../../services/file'
import { useUser } from '../../../hooks/user'
import CommonContext from '../../../store/CommonContext'
import { Dialog, IconButton, Button, TextField } from '@mui/material'
import { MdClose } from 'react-icons/md'

export default function () {
  const { user } = useUser()
  const { post } = useContext(PostContext)
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const queryClient = useQueryClient()
  const contentRef = useRef()

  const query = useQueries(
    post.files.map(e => {
      return {
        queryKey: ['file', e],
        queryFn: () => FileApi.getFileById(e)
      }
    })
  )


  useEffect(() => {
    if (query.every(e => !e.isError && !e.isLoading)) {
      Promise.all(query.map(e => fetch(e.data.url).then(res => res.blob())))
        .then(res => setFiles(res))
    }
  }, [query.every(e => !e.isError && !e.isLoading)])


  if (query.some(e => e.isError || e.isLoading)) return <></>

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
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={`left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed p-5 w-[90%] max-h-screen max-sm:w-screen overflow-y-auto max-w-[500px] flex flex-col gap-5 bg-surface text-onSurface rounded-lg shadow-lg`}>
        <div className="absolute right-5 top-5"><IconButton onClick={() => setOpen(false)} color='primary' ><MdClose className='w-6 h-6' /></IconButton></div>
        <UserAccount id={user._id} />
        <TextField variant='standard' defaultValue={post.content} placeholder={'Viết nội dung'} className={'w-full'} autoFocus inputRef={contentRef} />
        <Upload files={files} setFiles={setFiles} />
        <Button onClick={handleUpdatePost} variant='contained'>Update Post</Button>
      </div>
    </Dialog>
    <div onClick={() => setOpen(true)} className="p-2 btn">Chỉnh sửa</div>
  </div>
}