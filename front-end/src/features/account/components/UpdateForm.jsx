import { Input, Button, FileInput } from '../../../components/ui'
import { useContext, useRef, useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const {user, setUser} = useContext(CommonContext)
  const [image, setImage] = useState(null)
  const phoneNumberRef = useRef(),
    emailRef = useRef(),    
    firstNameRef = useRef(),
    lastNameRef = useRef(),
    fileRef = useRef()

  const handleUpdate = () => {
    const formData = new FormData()
    if(phoneNumberRef.current.value) formData.append('phoneNumber', phoneNumberRef.current.value)
    if(emailRef.current.value) formData.append('email', emailRef.current.value)
    if(firstNameRef.current.value) formData.append('firstName', firstNameRef.current.value)
    if(lastNameRef.current.value) formData.append('lastName', lastNameRef.current.value)
    if(image) formData.append('avatar', fileRef.current.files[0])
    api.updateById(user._id, formData)
      .then(user => setUser(user))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col justify-center gap-5 card dark:card-black p-5">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Số điện thoại</div>
      <Input className="bg-white border-teal border-2 dark:bg-black" defaultValue={user.phoneNumber} autoFocus={true} ref={phoneNumberRef} />
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
    {image && <img src={image} className='w-72 rounded-full h-72 object-cover'></img>}
    <div className="m-auto w-max">
      <FileInput className="btn-teal dark:btn-grey"  accept={'image/*'} onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} ref={fileRef}/>
    </div>
    <Button onClick={handleUpdate} className={'m-auto btn-teal dark:btn-grey'}>Cập Nhật</Button>
  </div>
}