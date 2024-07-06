import { Button, Chip, Dialog, IconButton, TextField } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { FaFilePen } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { MdAccountCircle, MdAdd, MdClose, MdForum, MdImage, MdVideoCall } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FilePreview, UserAccount } from '../../../components'
import Upload from '../../../components/Upload'
import { useUser } from '../../../hooks/user'
import { GroupContext } from '../../group'
import PostApi from '../services/PostApi'

function NormalPost({ handleCreatePost }) {
  const [files, setFiles] = useState([])
  const contentRef = useRef()

  const handleDrop = e => {
    e.preventDefault()
    setFiles([...files, ...e.dataTransfer.files])
  }

  const onSubmit = () => {
    const formData = new FormData()
    console.log(contentRef.current.value)
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    files.forEach(e => formData.append('files', e))
    handleCreatePost(formData)
  }

  return <div className='flex flex-col gap-5'>
    <div>
      <TextField placeholder={'Viết nội dung'} inputRef={contentRef} variant='standard' className='w-full' multiline />
      <div onDragOver={e => e.preventDefault()} onDrop={handleDrop} className='h-60 flex flex-col gap-2 items-center justify-center'>
        <FaFilePen className='w-10 h-10 text-primary' />
        <div className='font-semibold'>Kéo thả hình ảnh/video vào đây</div>
      </div>
      <Upload files={files} setFiles={setFiles} />
    </div>
    <Button onClick={onSubmit} variant='contained'>Post</Button>
  </div>
}


function LivePost({ handleCreatePost }) {
  const contentRef = useRef()

  const onSubmit = () => {
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    handleCreatePost(formData)
  }

  return <div className='flex flex-col gap-5'>
    <TextField placeholder={'Viết nội dung'} inputRef={contentRef} variant='standard' className='w-full' multiline />
    <Button onClick={onSubmit} variant='contained'>Start</Button>
  </div>
}


function VotePost({ handleCreatePost }) {
  const contentRef = useRef(), optionRef = useRef()
  const [files, setFiles] = useState([])
  const [options, setOptions] = useState([])

  const onSubmit = () => {
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    files.forEach(e => formData.append('files', e))
    options.forEach((e, i) => formData.append(`options[${i}][content]`, e.content))
    handleCreatePost(formData)
  }

  const addOption = () => {
    setOptions([...options, { content: optionRef.current.value }])
  }

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  return <div className='flex flex-col gap-5'>
    <TextField placeholder='Viết nội dung' className='w-full' inputRef={contentRef} multiline variant='standard' />
    <Upload files={files} setFiles={setFiles} />
    {
      options.map((e, i) => <div key={i} className='flex overflow-hidden justify-between items-center gap-2'>
        <div className='py-2 px-5 bg-background text-onBackground w-full break-all rounded-lg'>{e.content}</div>
        <IconButton onClick={() => removeOption(i)} color='primary'><MdClose className='w-6 h-6' /></IconButton>
      </div>)
    }
    
    <TextField placeholder={'Thêm lựa chọn'} className='w-full' inputRef={optionRef} slotProps={{
      input: {
        endAdornment: <IconButton color='primary' onClick={addOption}><MdAdd /></IconButton>
      }
    }}/>
    <Button onClick={onSubmit} variant='contained'>Start a vote</Button>
  </div>
}

export default function CreatePost() {

  const { user } = useUser()
  const groupContext = useContext(GroupContext)
  const [type, setType] = useState()
  const navigate = useNavigate()

  const handleCreatePost = (formData) => {
    if (groupContext) formData.append('group', groupContext.group._id)
    formData.append('type', type)
    PostApi.create(formData)
      .then((res) => {
        setType(null)
        if (res.type === 'Live') navigate(`/posts/${res._id}`)
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-10 rounded-md p-5 bg-surface text-onSurface shadow">
    <Dialog open={type} onClose={() => setType(null)}>
      <div className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-10 -translate-y-1/2 transition-transform duration-500 bg-surface text-onSurface rounded-lg p-5 max-h-[80%] w-[90%] max-sm:max-w-screen sm:max-w-[500px] max-sm:max-h-screen max-sm:w-screen overflow-y-auto flex flex-col gap-5`}>
        <div className="absolute right-5 top-5">
          <IconButton onClick={() => setType(null)} color='primary'><IoClose /></IconButton>
        </div>
        <div className='flex gap-2 items-center'>
          <img className={'w-8 h-8 overflow-hidden rounded-full object-cover'} src={user.avatar.url}/> 
          <div className='font-semibold'> {user.firstName} {user.lastName} </div>
        </div>
        {type === "Normal" && <NormalPost handleCreatePost={handleCreatePost} />}
        {type === 'Live' && <LivePost handleCreatePost={handleCreatePost} />}
        {type === 'Vote' && <VotePost handleCreatePost={handleCreatePost} />}
      </div>
    </Dialog>
    <div className='flex gap-5 items-center'>
      <img className={'w-8 h-8 overflow-hidden rounded-full object-cover'} src={user.avatar.url}/> 
      <div className='bg-background grow py-2 px-5 cursor-pointer select-none rounded-3xl text-onBackground active:bg-background/70' onClick={() => setType('Normal')}>Share your thoughts...</div>
    </div>
    <div className='flex gap-2'>
      <Chip label="Trực tiếp" onClick={() => setType("Live")} icon={<MdVideoCall size={20} color='#dc2626' />} />
      <Chip label="Hình ảnh/Video" onClick={() => setType("Normal")} icon={<MdImage size={20} color='#2563eb' />} />
      <Chip label="Khảo sát" onClick={() => setType("Vote")} icon={<MdForum size={20} color='#16a34a' />} />
    </div>
  </div>
}