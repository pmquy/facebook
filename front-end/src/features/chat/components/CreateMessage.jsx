import MessageApi from "../services/message"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { Button, Input } from "../../../components/ui"
import Upload from '../../../components/Upload'
import { IoMdSend } from "react-icons/io"
import { useQueryClient } from "react-query"
import { MdAdd, MdDelete, MdDone } from "react-icons/md";

function CreateVote({id}) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [files, setFiles] = useState([])
  const ref = useRef()
  const queryClient = useQueryClient()

  const handleCreate = () => {
    const formData = new FormData()
    if(ref.current.value) formData.append('content',ref.current.value)
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
    <Button onClick={() => setOpen(!open)} className={'btn-teal dark:btn-grey'}>Tạo cuộc bình chọn</Button>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`top-0 z-10 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    {open && <div ref={ref} className=" fixed z-10 card dark:card-black max-w-[500px] w-90% max-sm:w-screen left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-5 p-5">
      <Input ref={ref} autoFocus={true} onKeyDown={e => {if(e.key == 'Enter') handleAddOption()}} placeholder="Tiêu đề" className='bg-white dark:bg-black border-2 border-teal w-full' />
      <Upload files={files} setFiles={setFiles} />
      {options.map((e, i) => <div className=" flex items-center gap-5" key={i}>
        <Input value={e} onChange={e => handleChangeOption(i, e.target.value)} autoFocus={true} onKeyDown={e => {if(e.key == 'Enter') handleAddOption()}} placeholder="Nội dung" className='bg-white dark:bg-black border-2 border-teal' />
        <MdDelete onClick={() => handleDeleteOption(i)} className=" w-8 h-8 btn-teal dark:btn-grey" />
      </div>)}
      <div className="flex gap-5">
        <MdAdd onClick={handleAddOption} className="w-8 h-8 btn-teal dark:btn-grey"/>
        <MdDone onClick={handleCreate} className="w-8 h-8 btn-teal dark:btn-grey"/>
      </div>
    </div>}
  </div>
}

export default function ({ id }) {
  const contentRef = useRef()
  const [files, setFiles] = useState([])
  const queryClient = useQueryClient()

  const handleCreate = () => {
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    formData.append('groupChat', id)
    formData.append('type', 'message')
    files.forEach(e => formData.append('files', e))
    MessageApi.create(formData).then(() => queryClient.invalidateQueries(['messages', { groupChat: id }])).catch(err => toast(err.message, { type: 'error' }))
    setFiles([])
    contentRef.current.value = ''
  }


  return <div className="flex flex-col gap-3 p-2 rounded-lg border-teal border-2 dark:bg-black">
    <Input placeholder={'Viết bình luận'} className={'bg-white dark:bg-black flex-grow'} ref={contentRef} />
    <CreateVote id={id} />
    <div className="flex gap-5 justify-between">
      <div className="max-w-[500px]">
        <Upload files={files} setFiles={setFiles} />
      </div>
      <IoMdSend onClick={handleCreate} className=" min-w-6 min-h-6 bg-teal hover:bg-black dark:bg-grey dark:hover:bg-teal text-white  rounded-lg p-1" />
    </div>
  </div>
}