import { useContext, useRef, useState } from "react"
import CommonContext from "../../../store/CommonContext"
import { Button, FileInput, Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import { useQueryClient } from "react-query"
import CommentContext from "../store/CommentContext"
import PostContext from '../store/PostContext'

export default function () {
  const { user } = useContext(CommonContext)
  const commentContext = useContext(CommentContext)
  const postContext = useContext(PostContext)
  const contentRef = useRef(), fileRef = useRef()
  const [images, setImages] = useState([])
  const queryClient = useQueryClient()

  const handleComment = e => {
    e.preventDefault()
    const formData = new FormData()
    if (contentRef.current.value)
      formData.append('content', contentRef.current.value)
    formData.append('post', postContext.post._id)
    if (commentContext) {
      formData.append('comment', commentContext.comment._id) // khi vao form la comment : 'undefined'
    }
    for (let i = 0; i < fileRef.current.files.length; i++) {
      formData.append('images', fileRef.current.files[i])
    }
    CommentApi.create(formData)
      .then(() => {
        setImages([])
        if (commentContext) commentContext.setCreate(false)
        queryClient.invalidateQueries(['comments', { comment: commentContext ? commentContext.comment._id : '', post: postContext.post._id }])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className={`flex relative flex-col gap-2 ${commentContext ? 'pl-8 border-l-2 border-red_0' : ''}`}>
    {commentContext && <div className=" absolute left-0 top-4 border-red_0 w-8 border-t-2"></div>}
    <UserAccount id={user._id} />
    {images.map((e, i) => <img key={i} src={e} className='w-64 rounded-xl'></img>)}
    <div className="flex max-sm:flex-col max-sm:gap-2 gap-5 items-center">
      <div className="flex gap-5 items-center">
        <Input autoFocus={true} placeholder={'Viết bình luận'} className={'flex-grow'} ref={contentRef} />
        <FileInput onChange={e => setImages([...e.target.files].map(e => URL.createObjectURL(e)))} ref={fileRef} accept={'image/*'}>Tải ảnh lên</FileInput>
      </div>
      <div className="flex gap-5 items-center">
        <Button onClick={handleComment}>Bình luận</Button>
        <div className="btn" onClick={() => {
          if (commentContext)
            commentContext.setCreate(false)
          else
            postContext.setCreate(false)
        }}>Hủy</div>
      </div>
    </div>
  </div>
}