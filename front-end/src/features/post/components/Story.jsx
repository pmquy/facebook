import { Link } from "react-router-dom";
import { FilePreview } from "../../../components";

import { Button, Dialog, IconButton, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { FileInput } from "../../../components/ui";
import { useUser } from "../../../hooks/user";
import StoryApi from "../services/StoryApi";
import { cloneElement, useEffect } from "react";

export function StoryWrapper ({ children }) {
  const [stories, setStories] = useState([]);
  const hasMoreRef = useRef(true)

  const loadMore = async () => {
    await StoryApi.get({}).then(e => setStories(prev => [...prev, ...e]))
    hasMoreRef.current = false
  }
  
  useEffect(() => {
    StoryApi.get({}).then(setStories)
    hasMoreRef.current = true
  }, [])

  return <div>
    {cloneElement(children, { stories, loadMore, hasMore: hasMoreRef.current })}
  </div>
}

export function CreateStory() {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const { user } = useUser()
  const contentRef = useRef()

  const handleDrop = e => {
    e.preventDefault()
    setFiles([...files, ...e.dataTransfer.files])
  }

  const onSubmit = async () => {
    try {
      const formData = new FormData()
      if (contentRef.current.value) formData.append('content', contentRef.current.value)
      files.forEach(e => formData.append('files', e))
      await StoryApi.create(formData)
      setOpen(false)
    } catch(err) {
      console.log(err)
    }
  }

  return <div className="">
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={`left-1/2 -translate-x-1/2 top-1/2 fixed -translate-y-1/2 card max-h-[80%] w-[90%] sm:max-w-[500px] max-sm:max-h-screen max-sm:w-screen overflow-y-auto flex flex-col gap-5`}>
        <div className="absolute right-5 top-5">
          <IconButton onClick={() => setOpen(false)} color='inherit'><IoClose /></IconButton>
        </div>
        <div className='flex gap-2 items-center'>
          <img className={'w-8 h-8 overflow-hidden rounded-full object-cover'} src={user.avatar.url} />
          <div className='font-semibold'> {user.firstName} {user.lastName} </div>
        </div>
        <TextField placeholder={'Viết nội dung'} inputRef={contentRef} variant='standard' className='w-full' multiline />
        <div onDragOver={e => e.preventDefault()} onDrop={handleDrop} className='h-60 flex flex-col gap-2 items-center justify-center'>
          <FaFilePen className='w-10 h-10 text-primary' />
          <div className='font-semibold'>Kéo thả hình ảnh vào đây</div>
        </div>
        <FileInput accept="image/*" onChange={e => setFiles(t => [...t, ...e.target.files])}></FileInput>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-5">
          {
            files.map((e, i) => <div key={i} className=" relative rounded-md overflow-hidden">
              <div className="top-2 right-2 bg-black/20 text-white absolute">
                <IconButton color="inherit" onClick={() => setFiles(t => t.filter((_, index) => index !== i))}>
                  <IoMdClose className="w-4 h-4"/>
                </IconButton>
              </div>
              {e.type.split('/')[0] == 'image' ? <img className="object-cover" key={e} src={URL.createObjectURL(e)} /> :
                e.type.split('/')[0] == 'video' ? <video key={i} src={URL.createObjectURL(e)} controls={true} /> :
                  <div className="flex flex-col items-center">
                    <FaFileAlt className="w-8 h-8" />
                    <div >{e.name}</div>
                  </div>}
            </div>)
          }
        </div>
          <Button onClick={onSubmit} variant='contained'>Post</Button>
      </div>
    </Dialog>
    <IconButton onClick={() => setOpen(true)}>
      <MdAdd size={24} />
    </IconButton>
  </div>
}

function _Stories({ stories, loadMore }) {
  return <div className="flex gap-2 p-5 bg-surface text-onSurface rounded-md shadow">
    <div className="flex shrink-0 flex-col gap-2 items-center w-32 h-44 border-2 border-dashed border-primary rounded-lg justify-center">
      <CreateStory />
      <div className="text-sm">Post a story</div>
    </div>
    <div className="flex gap-2 overflow-y-auto pb-2">
      {stories.map(e => <Link key={e._id} to={'/stories'} className="shrink-0 relative overflow-hidden rounded-lg">
        <div className="w-32 h-44 object-cover"><FilePreview id={e.files[0]} /></div>
        <div className="right-0 h-1/2 absolute bottom-0 left-0 bg-linear-180 from-transparent to-black"></div>
        <div className="absolute bottom-2 left-0 right-0 text-xs text-center text-white">{e.user.firstName} {e.user.lastName}</div>
      </Link>)}
    </div>
  </div>
}

export function Stories () {
  return <StoryWrapper>
    <_Stories />
  </StoryWrapper>
}