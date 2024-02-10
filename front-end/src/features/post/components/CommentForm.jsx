import { useContext, useRef } from "react"
import CommonContext from "../../../store/CommonContext"
import { Button, FileInput, Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import { useQueryClient } from "react-query"
import UserAccount from '../../../components/UserAccount'

export default function ({ id }) {
  const { user } = useContext(CommonContext)
  const queryClient = useQueryClient()
  const contentRef = useRef(), fileRef = useRef()

  const handleComment = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', contentRef.current.value)
    formData.append('post', id)
    if (fileRef.current.files[0]) {
      formData.append('image', fileRef.current.files[0])
    }
    CommentApi.create(formData)
      .then(() => queryClient.invalidateQueries(['commentposts', id]))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-2">
    <UserAccount id={user._id}/>
    <div className="flex gap-5 items-center">
      <Input placeholder={'Viết bình luận'} className={'flex-grow'} ref={contentRef} />
      <FileInput ref={fileRef} />
      <Button onClick={handleComment}>Bình luận</Button>
    </div>
  </div>
}