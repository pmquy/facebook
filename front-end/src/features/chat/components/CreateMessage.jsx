import MessageApi from "../services/message"
import { useContext, useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button, FileInput, Input } from "../../../components/ui"
import Upload from '../../../components/Upload'

export default function ({ id }) {
  const contentRef = useRef(), imageRef = useRef()
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])

  const handleCreate = () => {
    const formData = new FormData()
    formData.append('content', contentRef.current.value)
    formData.append('groupChat', id)
    images.forEach(e => formData.append('images', e))
    videos.forEach(e => formData.append('videos', e))
    MessageApi.create(formData)
      .catch(err => toast(err.message, { type: 'error' }))
  }


  return <div className="flex flex-col gap-5">
    <div className="flex gap-5 max-sm:flex-col">
      <Input className={'flex-grow'} ref={contentRef} />
      <div className="flex flex-col gap-2">
        <Upload videos={videos} setImages={setImages} setVideos={setVideos} images={images}/>
        <Button onClick={handleCreate}>Send</Button>
      </div>
    </div>
  </div>
}