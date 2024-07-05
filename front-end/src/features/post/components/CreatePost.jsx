import { useContext, useEffect, useRef, useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { Button, Textarea } from '../../../components/ui'
import PostApi from '../services/PostApi'
import { toast } from 'react-toastify'
import { UserAccount } from '../../../components'
import { GroupContext } from '../../group'
import { IoCloseCircle } from "react-icons/io5";
import { useQueryClient } from 'react-query'
import { File } from '../../../components'
import Upload from '../../../components/Upload'
import { useUser } from '../../../hooks/user'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const { user } = useUser()
  const groupContext = useContext(GroupContext)
  const {headerRef} = useContext(CommonContext)
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])
  const queryClient = useQueryClient()
  const ref = useRef(), contentRef = useRef()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    headerRef.current.style['z-index'] = open ? 5 : 10
  }, [open])

  const handleCreatePost = () => {
    const formData = new FormData()
    if (contentRef.current.value) formData.append('content', contentRef.current.value)
    if (groupContext) formData.append('group', groupContext.group._id)
    files.forEach(e => formData.append('files', e))
    PostApi.create(formData)
      .then(() => {
        setFiles([])
        contentRef.current.value = ''
        setOpen(false)
        queryClient.invalidateQueries(['posts', groupContext ? { group: groupContext.group._id } : {}])
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className='flex card dark:card-black gap-5 items-center p-5'>
    {open && <div onClick={e => { if (!ref.current.contains(e.target)) setOpen(false) }} className={`z-10 top-0 left-0 w-screen h-screen fixed bg-black_trans`}></div>}
    <div ref={ref} className={`left-1/2 -translate-x-1/2 top-1/2 fixed z-10 ${open ? '-translate-y-1/2' : 'translate-y-[1000px]'} transition-transform duration-500 card dark:card-black p-5 max-h-[80%] w-[90%] max-sm:max-w-screen sm:max-w-[500px] max-sm:max-h-screen max-sm:w-screen overflow-y-auto flex flex-col gap-5`}>
      <IoCloseCircle onClick={() => setOpen(false)} className='w-10 h-10 absolute right-5 top-5 btn-teal dark:btn-grey' />
      <UserAccount id={user._id} />
      <div className="border-2 border-teal p-2 rounded-lg">
        <Textarea placeholder={'Viết nội dung'} className={'w-full bg-white dark:bg-black'} autoFocus={true} ref={contentRef} />
        <Upload files={files} setFiles={setFiles}/>
      </div>
      <Button onClick={handleCreatePost} className={'m-auto btn-teal dark:btn-grey'}>Đăng</Button>
    </div>
    {user.avatar ? <File needToNavigate={false} id={user.avatar} className={'min-w-8 min-h-8 max-w-8 max-h-8 object-cover rounded-full'} /> : <MdAccountCircle className='w-8 h-8' />}
    <div onClick={() => setOpen(true)} className='btn p-2 rounded-xl flex-grow border-2 border-teal'>Bạn đang nghĩ gì thế</div>
  </div>
}