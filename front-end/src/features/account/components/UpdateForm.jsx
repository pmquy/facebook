import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const {user, setUser} = useContext(CommonContext)
  const phoneNumberRef = useRef(),
    emailRef = useRef(),    
    firstNameRef = useRef(),
    lastNameRef = useRef()

  const handleUpdate = () => {    
    api.updateById(user._id, {
      phoneNumber: phoneNumberRef.current.value ? phoneNumberRef.current.value : undefined,
      email: emailRef.current.value ? emailRef.current.value : undefined,
      password: passwordRef.current.value ? passwordRef.current.value : undefined,
      firstName: firstNameRef.current.value ? firstNameRef.current.value : undefined,
      lastName: lastNameRef.current.value ? lastNameRef.current.value : undefined,
    })
      .then(user => setUser(user))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-5 card p-5">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Số điện thoại</div>
      <Input defaultValue={user.phoneNumber} autoFocus={true} ref={phoneNumberRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Email</div>
      <Input defaultValue={user.email} ref={emailRef} />
    </div>    
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Họ</div>
      <Input defaultValue={user.firstName} ref={firstNameRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Tên</div>
      <Input defaultValue={user.lastName} ref={lastNameRef} />
    </div>
    <Button onClick={handleUpdate} className={'m-auto'}>Cập Nhật</Button>
  </div>
}