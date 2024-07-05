import { Input, Button, FileInput } from '../../../components/ui'
import { useEffect, useRef, useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { useQuery } from 'react-query'
import FileApi from '../../../services/file'
import { useUser } from '../../../hooks/user'
import File from '../../../components/File'

export default function () {
  const { user, setUser } = useUser()
  const [image, setImage] = useState(null)
  const phoneNumberRef = useRef(),
    emailRef = useRef(),
    firstNameRef = useRef(),
    lastNameRef = useRef()

  const query = useQuery({
    queryKey: ['file', user.avatar],
    queryFn: () => FileApi.getFileById(user.avatar).then(data => new File([new Uint8Array(data.data.data)], data.name, { type: data.type }))
  })

  useEffect(() => {
    if (!query.isLoading && !query.isError) {
      setImage(query.data)
    }
  }, [query.isLoading])

  if (query.isLoading || query.isError) return <></>

  const handleUpdate = () => {
    const formData = new FormData()
    if (phoneNumberRef.current.value) formData.append('phoneNumber', phoneNumberRef.current.value)
    if (emailRef.current.value) formData.append('email', emailRef.current.value)
    if (firstNameRef.current.value) formData.append('firstName', firstNameRef.current.value)
    if (lastNameRef.current.value) formData.append('lastName', lastNameRef.current.value)
    if (image) formData.append('avatar', image)
    api.update(formData)
      .then(user => {
        setUser(user)
        setImage(null)
      })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col justify-center gap-5 card dark:card-black p-5">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Số điện thoại</div>
      <Input className="bg-white border-teal border-2 dark:bg-black" defaultValue={user.phoneNumber} ref={phoneNumberRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Email</div>
      <Input className="bg-white border-teal border-2 dark:bg-black" defaultValue={user.email} ref={emailRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Họ</div>
      <Input className="bg-white border-teal border-2 dark:bg-black" defaultValue={user.firstName} ref={firstNameRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Tên</div>
      <Input className="bg-white border-teal border-2 dark:bg-black" defaultValue={user.lastName} ref={lastNameRef} />
    </div>
    {image && <img src={URL.createObjectURL(image)} className='w-72 rounded-full h-72 object-cover m-auto'></img>}
    <div className="m-auto">
      <FileInput className="btn-teal dark:btn-grey" accept={'image/*'} onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} />
    </div>
    <Button onClick={handleUpdate} className={'m-auto btn-teal dark:btn-grey'}>Cập Nhật</Button>
  </div>
}