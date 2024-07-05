import { useContext, useEffect, useRef, useState } from "react"
import { Input } from '../../../components/ui'
import CommentApi from "../services/CommentApi"
import { toast } from 'react-toastify'
import { useQueries, useQueryClient } from "react-query"
import CommentContext from "../store/CommentContext"
import Upload from "../../../components/Upload"
import { IoMdSend } from "react-icons/io";
import { MdCancel } from "react-icons/md"
import FileApi from "../../../services/file"

export default function () {
  const { comment, setUpdate } = useContext(CommentContext)
  const contentRef = useRef()
  const [files, setFiles] = useState([])
  const queryClient = useQueryClient()

  const query = useQueries(comment.files.map(e => {
    return {
      queryKey: ['file', e],
      queryFn: () => FileApi.getFileById(e).then(data => {
        const blob = new Blob([new Uint8Array(data.data.data)], { type: data.type })
        return {
          file: blob,
          type: data.type.split('/')[0]
        }
      })
    }
  }))

  useEffect(() => {
    if(query.every(e => !e.isError && !e.isLoading)) setFiles(query.map(e => e.data))
  }, query.every(e => !e.isError && !e.isLoading))

  if(query.some(e => e.isError || e.isLoading)) return <></>
  
  const handleUpdate = e => {
    e.preventDefault()
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    files.forEach(e => formData.append('files', e))
    CommentApi.updateById(comment._id, formData)
      .then(() => {
        setFiles([])
        setUpdate(false)
        queryClient.invalidateQueries(['comment', comment._id])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className={`flex relative flex-col gap-2`}>
    <div className="flex flex-col gap-3 p-2 rounded-lg border-teal border-2">
      <Input defaultValue={comment.content} autoFocus={true} placeholder={'Viết bình luận'} className={'flex-grow bg-white dark:bg-black'} ref={contentRef} />
      <div className="flex gap-5 justify-between">
        <div className="max-w-96">
          <Upload files={files} setFiles={setFiles} />
        </div>
        <div className="flex gap-5">
          <IoMdSend onClick={handleUpdate} className={" w-6 h-6 bg-teal text-white hover:bg-black dark:bg-grey dark:hover:bg-teal rounded-lg p-1"} />
          <MdCancel className=" w-6 h-6 bg-teal text-white hover:bg-black dark:bg-grey dark:hover:bg-teal rounded-lg p-1" onClick={() => setUpdate(false)} />
        </div>
      </div>
    </div>
  </div>
}