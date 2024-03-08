import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import {useQueryClient} from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {setUser} = useContext(CommonContext)
  const phoneNumberRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    repeatPasswordRef = useRef(),
    firstNameRef = useRef(),
    lastNameRef = useRef()

  const handleRegister = () => {
    if (passwordRef.current.value != repeatPasswordRef.current.value)
      return toast('Mật khẩu không khớp', { type: 'warning' })
    api.create({
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    })
    .then( (user) => {setUser(user); queryClient.invalidateQueries(['users']); navigate('/login')})    
    .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-5 card p-5 m-auto">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Số điện thoại</div>
      <Input ref={phoneNumberRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Email</div>
      <Input ref={emailRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Mật khẩu</div>
      <Input ref={passwordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Nhập lại mật khẩu</div>
      <Input ref={repeatPasswordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Họ</div>
      <Input ref={firstNameRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Tên</div>
      <Input ref={lastNameRef} />
    </div>
    <Button onClick={handleRegister} className={'m-auto'}>Tạo mới</Button>
    <Link to={'/login'} className='text-1 underline text-center'>Quay lại trang đăng nhập</Link>
  </div>
}