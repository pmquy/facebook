import { useContext, useRef, useState } from "react"
import CommonContext from "../../../store/CommonContext"
import { Button, FileInput, Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import UserAccount from '../../../components/UserAccount'
import { useQueryClient } from "react-query"

export default function ({ comment, post }) {
  const { user } = useContext(CommonContext)  
  const contentRef = useRef(), fileRef = useRef()
  const [image, setImage] = useState()
  const queryClient = useQueryClient()

  const handleComment = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('content', contentRef.current.value)    
    formData.append('post', post)    
    if(comment) {
      formData.append('comment', comment) // khi vao form la comment : 'undefined'
    }
    if (fileRef.current.files[0]) {
      formData.append('image', fileRef.current.files[0])
    }
    CommentApi.create(formData)      
      .then(() => queryClient.invalidateQueries('comments', {comment : comment, post : post}))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-2">
    <UserAccount id={user._id}/>
    {image && <img src={image} className='rounded-xl w-64'></img>}
    <div className="flex gap-5 items-center">
      <Input autoFocus={true} placeholder={'Viết bình luận'} className={'flex-grow'} ref={contentRef} />
      <FileInput onChange={e => setImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)} ref={fileRef} />
      <Button onClick={handleComment}>Bình luận</Button>
    </div>
  </div>
}