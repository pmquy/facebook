import { Button, Dialog, IconButton, TextField } from '@mui/material'
import { cloneElement, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { MdOutlineFavoriteBorder, MdShare } from 'react-icons/md'
import { useUser } from '../../../hooks/user'
import EventApi from '../services/EventApi'
import PostApi from '../services/PostApi'
import { FileInput } from "../../../components/ui"

export function AttendEvent({ event }) {
  const [isAttendee, setIsAttendee] = useState(event.isAttendee)

  const attend = async () => {
    try {
      if (isAttendee) {
        await EventApi.unattend(event._id)
      } else {
        await EventApi.attend(event._id)
      }
      setIsAttendee(!isAttendee)
    } catch (error) {

    }
  }

  return <Button fullWidth color="primary" variant={isAttendee ? "contained" : "outlined"} onClick={attend}>
    <div className="flex gap-2 justify-center">
      <MdOutlineFavoriteBorder className="w-5 h-5" />
      <div className="text-sm capitalize">{isAttendee ? "Unattend" : "Attend"}</div>
    </div>
  </Button>
}

export function EventsWrapper({ children, page = 0, limit = 10, query = {} }) {
  const [events, setEvents] = useState([]);
  const hasMoreRef = useRef(false)
  const pageRef = useRef(page)

  const loadMore = async () => {
    if (hasMoreRef.current) {
      await EventApi.get({ q: query }).then(e => {
        hasMoreRef.current = e.hasMore
        pageRef.current++
        setEvents(prev => [...prev, ...e.events])
      })
    }
  }

  useEffect(() => {
    EventApi.get({ q: query, page: page, limit: limit }).then(e => {
      hasMoreRef.current = e.hasMore
      pageRef.current = page + 1
      setEvents(e.events)
    })
  }, [])

  return <div>
    {cloneElement(children, { events, loadMore, hasMore: hasMoreRef.current })}
  </div>
}

export function SharePost({ id, type, children }) {
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
    <IconButton color="primary"><MdShare className="w-5 h-5" /></IconButton>
  </div>
}

export function CreateEvent({ data }) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState()
  const titleRef = useRef(), descriptionRef = useRef(), categoryRef = useRef(), timeRef = useRef(), locationRef = useRef()
  const { user } = useUser()

  const onSubmit = async () => {
    try {
      if (!titleRef.current.value || !descriptionRef.current.value || !categoryRef.current.value || !timeRef.current.value || !locationRef.current.value || !image) throw new Error('Please fill all fields')
      const formData = new FormData()
      if (data) Object.entries(data).forEach(([key, value]) => formData.append(key, value))
      formData.append('title', titleRef.current.value)
      formData.append('description', descriptionRef.current.value)
      formData.append('category', categoryRef.current.value)
      formData.append('time', timeRef.current.value)
      formData.append('location', locationRef.current.value)
      formData.append('cover', image)
      await EventApi.create(formData)
      setOpen(false)
    } catch (err) {
      
    }
  }

  return <div>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={`left-1/2 -translate-x-1/2 top-1/2 fixed -translate-y-1/2 card max-h-[80%] w-[90%] sm:max-w-[500px] max-sm:max-h-screen max-sm:w-screen overflow-y-auto flex flex-col gap-5`}>
        <div className='flex gap-2 items-center'>
          <img className={'w-8 h-8 overflow-hidden rounded-full object-cover'} src={user.avatar.url} />
          <div className='font-semibold'>{user.firstName} {user.lastName} </div>
          <div className="grow"></div>
          <IconButton onClick={() => setOpen(false)} color='inherit'><IoClose /></IconButton>
        </div>
        <TextField required label={'Title'} inputRef={titleRef} variant='standard' fullWidth />
        <TextField required label={'Description'} inputRef={descriptionRef} variant='standard' fullWidth multiline />
        <TextField required label={'Category'} inputRef={categoryRef} variant='standard' fullWidth />
        <TextField required placeholder={'Time'} type="datetime-local" inputRef={timeRef} variant='standard' fullWidth />
        <TextField required label={'Location'} inputRef={locationRef} variant='standard' fullWidth />
        <div className="flex gap-2 justify-center items-center">
          <div className="font-semibold">Thêm ảnh</div>
          <FileInput accept="image/*" onChange={e => setImage(e.target.files[0])}></FileInput>
        </div>
        {image && <img src={URL.createObjectURL(image)} className="h-60 object-cover" />}
        <Button onClick={onSubmit} variant='contained'>Create Event</Button>
      </div>
    </Dialog>
    <Button onClick={() => setOpen(true)} color="success" variant="outlined"><div className=" capitalize">Create event</div></Button>
  </div>
}


