import { useContext, useRef, useState } from "react"
import CommonContext from "../../../store/CommonContext"
import { Button, Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import { useQueryClient } from "react-query"
import CommentContext from "../store/CommentContext"
import PostContext from '../store/PostContext'
import Upload from "../../../components/Upload"
import { IoMdSend } from "react-icons/io";
import { MdCancel } from "react-icons/md"

export default function () {
  const { user } = useContext(CommonContext)
  const commentContext = useContext(CommentContext)
  const postContext = useContext(PostContext)
  const contentRef = useRef()
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const queryClient = useQueryClient()

  const handleComment = e => {
    e.preventDefault()
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    formData.append('post', postContext.post._id)
    if (commentContext) formData.append('comment', commentContext.comment._id)
    images.forEach(e => formData.append('images', e))
    videos.forEach(e => formData.append('videos', e))
    CommentApi.create(formData)
      .then(() => {
        setImages([])
        setVideos([])
        contentRef.current.value = ''
        if (commentContext) commentContext.setCreate(false)
        queryClient.invalidateQueries(['comments', { comment: commentContext ? commentContext.comment._id : '', post: postContext.post._id }])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className={`flex relative flex-col gap-2 ${commentContext ? 'pl-8 border-l-2 border-teal' : ''}`}>
    {commentContext && <div className=" absolute left-0 top-4 border-teal w-8 border-t-2"></div>}
    <UserAccount id={user._id} />
    <div className="flex flex-col gap-3 p-2 rounded-lg border-teal border-2">
      <Input autoFocus={true} placeholder={'Viết bình luận'} className={'bg-white flex-grow'} ref={contentRef} />
      <div className="flex gap-5 justify-between">
        <Upload videos={videos} setImages={setImages} setVideos={setVideos} images={images}/>
        <div className="flex gap-5">
          <IoMdSend onClick={handleComment} className=" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1"/>
          <MdCancel onClick={() => {if (commentContext) commentContext.setCreate(false); else postContext.setCreate(false)}} className=" w-6 h-6 bg-teal text-white hover:bg-black rounded-lg p-1"/>
        </div>
      </div>
    </div>
  </div>
}