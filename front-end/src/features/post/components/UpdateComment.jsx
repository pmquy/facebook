import { useContext, useRef, useState } from "react"
import { Button, FileInput, Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import { useQueryClient } from "react-query"
import CommentContext from "../store/CommentContext"
import Upload from "../../../components/Upload"
import { IoMdSend } from "react-icons/io";
import {MdCancel} from "react-icons/md"

export default function () {
  const commentContext = useContext(CommentContext)
  const contentRef = useRef(), fileRef = useRef()
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const queryClient = useQueryClient()

  const handleUpdate = e => {
    e.preventDefault()
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    images.forEach(e => formData.append('images', e))
    videos.forEach(e => formData.append('videos', e))
    CommentApi.updateById(commentContext.comment._id, formData)
      .then(() => {
        setImages([])
        commentContext.setUpdate(false)
        queryClient.invalidateQueries(['comment', commentContext.comment._id])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className={`flex relative flex-col gap-2`}>
    {images.map((e, i) => <img key={i} src={e} className='w-64 rounded-xl'></img>)}
    <div className="flex flex-col gap-3 p-2 rounded-lg border-teal border-2">
      <Input defaultValue={commentContext.comment.content} autoFocus={true} placeholder={'Viết bình luận'} className={'flex-grow'} ref={contentRef} />
      <div className="flex gap-5 justify-between">
        <Upload videos={videos} setImages={setImages} setVideos={setVideos} images={images}/>
        <div className="flex gap-5">
          
          <IoMdSend onClick={handleUpdate} className={" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1"}>Xong</IoMdSend>
          <MdCancel className=" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1" onClick={() => commentContext.setUpdate(false)}>Hủy</MdCancel>
        </div>
      </div>
    </div>
  </div>
}