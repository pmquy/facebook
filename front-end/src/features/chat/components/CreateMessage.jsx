import MessageApi from "../services/message"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button, Input } from "../../../components/ui"
import Upload from '../../../components/Upload'
import { IoMdSend } from "react-icons/io"

export default function ({ id }) {
  const contentRef = useRef()
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])

  const handleCreate = () => {
    const formData = new FormData()
    if (contentRef.current.value)
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


  return <div className="flex flex-col gap-3 p-2 rounded-lg border-teal border-2">
    <Input autoFocus={true} placeholder={'Viết bình luận'} className={'bg-white flex-grow'} ref={contentRef} />
    <div className="flex gap-5 justify-between">
      <Upload videos={videos} setImages={setImages} setVideos={setVideos} images={images} />
      <IoMdSend onClick={handleCreate} className=" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1" />
    </div>
  </div>
}