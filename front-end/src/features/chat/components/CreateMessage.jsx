import MessageApi from "../services/message"
import { useContext, useRef } from "react"
import CommonContext from '../../../store/CommonContext'
import { toast } from "react-toastify"
import { Button, FileInput, Input } from "../../../components/ui"

export default function ({id}) {  
  const contentRef = useRef(), imageRef = useRef()
  const {socket} = useContext(CommonContext)

  const handleCreate = () => {
    const formData = new FormData()
    formData.append('content', contentRef.current.value)
    formData.append('groupChat', id)
    if(imageRef.current.files[0]) {
      formData.append('image', imageRef.current.files[0])
    }
    MessageApi.create(formData)
      .then(() => {
        socket.emit('invalidate', ['messages', id])
      })
      .catch(err => toast(err.message, {type :'error'}))
  }
  
  return <div className="flex gap-5">
    <Input className={'flex-grow'} ref={contentRef}/>
    <FileInput ref={imageRef}/>
    <Button onClick={handleCreate}>Send</Button>
  </div>
}