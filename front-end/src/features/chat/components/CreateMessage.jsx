import { useRef, useState } from "react"
import { IoMdSend } from "react-icons/io"
import { MdAdd, MdDelete, MdDone, MdOutlineHowToVote } from "react-icons/md"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { Input } from "../../../components/ui"
import Upload from '../../../components/Upload'
import MessageApi from "../services/message"
import { IconButton, TextField } from "@mui/material"

function CreateVote({ id }) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [files, setFiles] = useState([])
  const ref = useRef()
  const queryClient = useQueryClient()

  const handleCreate = () => {
    const formData = new FormData()
    if (ref.current.value) formData.append('content', ref.current.value)
    formData.append('type', 'vote')
    files.forEach(e => formData.append('files', e))
    formData.append('groupChat', id)
    options.forEach(e => formData.append('options', e))
    MessageApi.create(formData).then(() => queryClient.invalidateQueries(['messages', { groupChat: id }])).catch(err => toast(err.message, { type: 'error' }))
  }

  const handleAddOption = () => {
    setOptions([...options, ''])
  }

  const handleDeleteOption = (i) => {
    setOptions(options.filter((e, j) => j != i))
  }

  const handleChangeOption = (i, val) => {
    options[i] = val
    setOptions([...options])
  }

  return <div>
    <MdOutlineHowToVote onClick={() => setOpen(true)} className={'bg-primary text-onPrimary hover:bg-secondary p-2 btn rounded-lg w-8 h-8'} title="Tạo cuộc bình chọn" />
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`top-0 z-10 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    {open && <div ref={ref} className=" fixed z-10 bg-background rounded-lg max-w-[500px] w-90% max-sm:w-screen left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-5 p-5">
      <TextField inputRef={ref} autoFocus={true} onKeyDown={e => { if (e.key == 'Enter') handleAddOption() }} placeholder="Tiêu đề" className='bg-white dark:bg-black border-2 border-teal w-full' />
      <Upload files={files} setFiles={setFiles} />
      {options.map((e, i) => <div className=" flex items-center gap-5" key={i}>
        <TextField value={e} onChange={e => handleChangeOption(i, e.target.value)} autoFocus={true} onKeyDown={e => { if (e.key == 'Enter') handleAddOption() }} placeholder="Nội dung" className='bg-white dark:bg-black border-2 border-teal' />
        <MdDelete onClick={() => handleDeleteOption(i)} className=" w-8 h-8 btn-teal dark:btn-grey" />
      </div>)}
      <div className="flex gap-5">
        <MdAdd onClick={handleAddOption} className="w-8 h-8 btn-teal dark:btn-grey" />
        <MdDone onClick={handleCreate} className="w-8 h-8 btn-teal dark:btn-grey" />
      </div>
    </div>}
  </div>
}

export default function CreateMessage({ id }) {
  const contentRef = useRef()
  const [files, setFiles] = useState([])

  const handleCreate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    formData.append('groupChat', id)
    formData.append('type', 'message')
    files.forEach(e => formData.append('files', e))
    MessageApi.create(formData).catch(err => toast(err.message, { type: 'error' }))
    setFiles([])
    contentRef.current.value = ''
  }

  const handleDrop = e => {
    console.log(e)
    e.preventDefault()
    setFiles([...files, ...e.dataTransfer.files])
  }


  return <form onDrop={handleDrop} onSubmit={handleCreate} className="flex flex-col gap-2">
    <TextField variant="outlined" placeholder={'Nhập nội dung'} inputRef={contentRef} slotProps={{
      input: {
        endAdornment: <IconButton onClick={handleCreate} color="primary"><IoMdSend className="w-6 h-6" /></IconButton>
      }
    }} />
    <div className="max-w-[500px]">
      <Upload files={files} setFiles={setFiles} />
    </div>
  </form>
}