import { useContext, useRef, useState } from "react"
import { Button, FileInput, Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import { useQueryClient } from "react-query"
import CommentContext from "../store/CommentContext"

export default function () {
  const commentContext = useContext(CommentContext)
  const contentRef = useRef(), fileRef = useRef()
  const [images, setImages] = useState([])
  const queryClient = useQueryClient()

  const handleUpdate = e => {
    e.preventDefault()
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    for (let i = 0; i < fileRef.current.files.length; i++) {
      formData.append('images', fileRef.current.files[i])
    }
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
    <div className="flex max-sm:flex-col max-sm:gap-2 gap-5 items-center">
      <div className="flex gap-5 items-center">
        <Input defaultValue={commentContext.comment.content} autoFocus={true} placeholder={'Viết bình luận'} className={'flex-grow'} ref={contentRef} />
        <FileInput onChange={e => setImages([...e.target.files].map(e => URL.createObjectURL(e)))} ref={fileRef} accept={'image/*'}>Tải ảnh lên</FileInput>
      </div>
      <div className="flex gap-5 items-center">
        <Button onClick={handleUpdate}>Xong</Button>
        <div className="btn" onClick={() => commentContext.setUpdate(false)}>Hủy</div>
      </div>
    </div>
  </div>
}