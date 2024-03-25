import { Input, Button, FileInput } from '../../../components/ui'
import { useContext, useRef, useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import CommonContext from '../../../store/CommonContext'

export default function () {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const queryClient = useQueryClient()
  const { setUser } = useContext(CommonContext)
  const phoneNumberRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    repeatPasswordRef = useRef(),
    firstNameRef = useRef(),
    lastNameRef = useRef(),
    fileRef = useRef()

  const handleRegister = () => {
    if (passwordRef.current.value != repeatPasswordRef.current.value) return toast('Mật khẩu không khớp', { type: 'warning' })
    const formData = new FormData()
    if (phoneNumberRef.current.value) formData.append('phoneNumber', phoneNumberRef.current.value)
    if (passwordRef.current.value) formData.append('password', passwordRef.current.value)
    if (emailRef.current.value) formData.append('email', emailRef.current.value)
    if (firstNameRef.current.value) formData.append('firstName', firstNameRef.current.value)
    if (lastNameRef.current.value) formData.append('lastName', lastNameRef.current.value)
    if (image) formData.append('avatar', fileRef.current.files[0])
    api.create(formData)
      .then((user) => {queryClient.invalidateQueries(['users']); navigate('/login') })
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
      <Input type={'password'} ref={passwordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Nhập lại mật khẩu</div>
      <Input type={'password'} ref={repeatPasswordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Họ</div>
      <Input ref={firstNameRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Tên</div>
      <Input ref={lastNameRef} />
    </div>
    {image && <img src={image} className='w-72 rounded-full h-72 object-cover'></img>}
    <FileInput ref={fileRef} onChange={e => setImage(URL.createObjectURL(e.target.files[0]))} accept={'image/*'} />
    <Button onClick={handleRegister} className={'m-auto'}>Tạo mới</Button>
    <Link to={'/login'} className='text-1 underline text-center'>Quay lại trang đăng nhập</Link>
  </div>
}