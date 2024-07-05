import { Input, Button, FileInput } from '../../../components/ui'
import { useContext, useRef, useState } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { MdEmail, MdPerson, MdPhoneIphone } from 'react-icons/md'
import { IoIosLock } from 'react-icons/io'

export default function () {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const queryClient = useQueryClient()
  const phoneNumberRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    repeatPasswordRef = useRef(),
    firstNameRef = useRef(),
    lastNameRef = useRef()

  const handleRegister = () => {
    if (passwordRef.current.value != repeatPasswordRef.current.value) return toast('Mật khẩu không khớp', { type: 'warning' })
    const formData = new FormData()
    if (phoneNumberRef.current.value) formData.append('phoneNumber', phoneNumberRef.current.value)
    if (passwordRef.current.value) formData.append('password', passwordRef.current.value)
    if (emailRef.current.value) formData.append('email', emailRef.current.value)
    if (firstNameRef.current.value) formData.append('firstName', firstNameRef.current.value)
    if (lastNameRef.current.value) formData.append('lastName', lastNameRef.current.value)
    if (image) formData.append('avatar', image)
    api.create(formData)
      .then((user) => { queryClient.invalidateQueries(['users']); navigate('/login') })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="flex flex-col gap-5">
    <div className="flex gap-5 items-center justify-between">
      <MdPhoneIphone className='w-6 h-6' />
      <Input className="bg-white dark:bg-black text-black dark:text-white" name="phonenumber" placeholder={'Your phonenumber'} ref={phoneNumberRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <MdEmail className='w-6 h-6' />
      <Input className="bg-white dark:bg-black text-black dark:text-white" name="email" placeholder={'Your email'} ref={emailRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <IoIosLock className='w-6 h-6' />
      <Input className="bg-white dark:bg-black text-black dark:text-white" name="password" placeholder={'Your password'} type={'password'} ref={passwordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <IoIosLock className='w-6 h-6' />
      <Input className="bg-white dark:bg-black text-black dark:text-white" name="repeatpassword" placeholder={'Repeat password'} type={'password'} ref={repeatPasswordRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <MdPerson className='w-6 h-6' />
      <Input className="bg-white dark:bg-black text-black dark:text-white" name="firstname" placeholder={'Your first name'} ref={firstNameRef} />
    </div>
    <div className="flex gap-5 items-center justify-between">
      <MdPerson className='w-6 h-6' />
      <Input className="bg-white dark:bg-black text-black dark:text-white" name="lastname" placeholder={'Your last name'} ref={lastNameRef} />
    </div>
    {image && <img src={URL.createObjectURL(image)} className='w-72 rounded-full h-72 object-cover m-auto'></img>}
    <div className="m-auto w-max">
      <FileInput className={'btn-teal dark:btn-grey'} onChange={e => setImage(e.target.files[0])} accept={'image/*'} />
    </div>
    <Button onClick={handleRegister} className={'m-auto btn-teal dark:btn-grey'}>Tạo mới</Button>
    <Link to={'/login'} className='text-1 hover:text-red_0 underline text-center'>Quay lại trang đăng nhập</Link>
  </div>
}