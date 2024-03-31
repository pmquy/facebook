import MessageApi from "../services/message"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button, Input } from "../../../components/ui"
import Upload from '../../../components/Upload'

export default function ({ id }) {
  const contentRef = useRef(), imageRef = useRef()
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])

  const handleCreate = () => {
    const formData = new FormData()
    if(contentRef.current.value)
      formData.append('content', contentRef.current.value)
    formData.append('groupChat', id)
    images.forEach(e => formData.append('images', e))
    videos.forEach(e => formData.append('videos', e))
    MessageApi.create(formData)
      .catch(err => toast(err.message, { type: 'error' }))
    setImages([])
    setVideos([])
    contentRef.current.value = ''
  }


  return <div className="flex flex-col gap-5">
    <Input className={'flex-grow'} ref={contentRef} />
    <Upload width={'400px'} videos={videos} setImages={setImages} setVideos={setVideos} images={images} />
    <Button className={'w-max'} onClick={handleCreate}>Send</Button>
  </div>
}