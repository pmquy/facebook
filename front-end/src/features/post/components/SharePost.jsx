import { Button, Dialog, IconButton, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { CiShare2 } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { useUser } from '../../../hooks/user'
import PostApi from '../services/PostApi'
import { MdShare } from 'react-icons/md'

export default function ({ id, type = "Post", children }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef()
  const { user } = useUser()

  const handleShare = async () => {
    const formData = new FormData()
    formData.append('content', contentRef.current.value)
    formData.append('type', 'Normal')
    formData.append("ref[type]", type)
    formData.append("ref[id]", id)
    await PostApi.create(formData)
    setOpen(false)
  }

  return <div className="">
    <Dialog open={open} onClose={() => setClose(false)}>
      <div className={`left-1/2 -translate-x-1/2 top-1/2 fixed -translate-y-1/2 card max-h-[80%] w-[90%] max-sm:max-w-screen sm:max-w-[500px] max-sm:max-h-screen max-sm:w-screen overflow-y-auto flex flex-col gap-5`}>
        <div className='flex gap-2 items-center'>
          <img className={'w-8 h-8 overflow-hidden rounded-full object-cover'} src={user.avatar.url} />
          <div className='font-semibold'> {user.firstName} {user.lastName} </div>
          <div className="grow"></div>
          <IconButton onClick={() => setOpen(false)}><IoClose /></IconButton>
        </div>
        <TextField placeholder='Write something' multiline variant='standard' inputRef={contentRef} />
        <Button onClick={handleShare} variant='contained'>Share</Button>
      </div>
    </Dialog>

    {type === "Post" && <Button onClick={() => setOpen(true)} startIcon={<CiShare2 />}>
      <div className='text-sm font-semibold capitalize'>Share</div>
    </Button>}

    {type === "Event" && <IconButton color='primary' onClick={() => setOpen(true)}>
      <MdShare className="w-5 h-5" />
    </IconButton>}
  </div>
}