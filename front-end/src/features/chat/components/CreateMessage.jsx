import MessageApi from "../services/message"
import { useContext, useRef, useState } from "react"
import CommonContext from '../../../store/CommonContext'
import { toast } from "react-toastify"
import { Button, FileInput, Input } from "../../../components/ui"

export default function ({ id }) {
  const contentRef = useRef(), imageRef = useRef()
  const [image, setImage] = useState()
  const { socket } = useContext(CommonContext)

  const handleCreate = () => {
    const formData = new FormData()
    formData.append('content', contentRef.current.value)
    formData.append('groupChat', id)
    if (imageRef.current.files[0]) {
      formData.append('image', imageRef.current.files[0])
    }
    MessageApi.create(formData)
      .catch(err => toast(err.message, { type: 'error' }))
  }


  return <div className="flex flex-col gap-5">
    <div className="flex gap-5 max-sm:flex-col">
      <Input className={'flex-grow'} ref={contentRef} />
      <div className="flex gap-5">
        <FileInput onChange={e => setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)} ref={imageRef} />
        <Button onClick={handleCreate}>Send</Button>
      </div>
    </div>
    {image && <img src={image} className='rounded-xl w-64'></img>}
  </div>
}