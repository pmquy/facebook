import { Button, Dialog, IconButton, TextField } from "@mui/material"
import { useRef, useState } from "react"
import { IoClose } from "react-icons/io5"
import { useUser } from "../../../hooks/user"
import { FileInput } from "../../../components/ui"
import EventApi from "../services/EventApi"

export default function CreateEvent({data}) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState()
  const titleRef = useRef(), descriptionRef = useRef(), categoryRef = useRef(), timeRef = useRef(), locationRef = useRef()
  const { user } = useUser()

  const onSubmit = async () => {
    try {
      const formData = new FormData()
      if(data) Object.entries(data).forEach(([key, value]) => formData.append(key, value))
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
        <TextField label={'Title'} inputRef={titleRef} variant='standard' fullWidth />
        <TextField label={'Description'} inputRef={descriptionRef} variant='standard' fullWidth multiline />
        <TextField label={'Category'} inputRef={categoryRef} variant='standard' fullWidth />
        <TextField placeholder={'Time'} type="datetime-local" inputRef={timeRef} variant='standard' fullWidth />
        <TextField label={'Location'} inputRef={locationRef} variant='standard' fullWidth />
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