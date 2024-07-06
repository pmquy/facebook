import { Button, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { IoIosLock } from 'react-icons/io'
import { MdEmail, MdPerson, MdPhoneIphone } from 'react-icons/md'
import { useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FileInput } from '../../../components/ui'
import api from '../services/api'

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

    <div className="text-4xl font-bold text-center">Sign In</div>
    <div>Already have an account? <Link to={'/login'} className="text-primary text-center">Sign in here</Link></div>

    <TextField slotProps={{
      input: {
        startAdornment: <MdPhoneIphone className=' w-6 h-6 mr-5' />
      }
    }} className="grow" name="phonenumber" placeholder={'Your phone number'} inputRef={phoneNumberRef} />

    <TextField slotProps={{
      input: {
        startAdornment: <MdEmail className=' w-6 h-6 mr-5' />
      }
    }} className="grow" name="email" type='email' placeholder={'Your email'} inputRef={emailRef} />

    <TextField slotProps={{
      input: {
        startAdornment: <IoIosLock className=' w-6 h-6 mr-5' />
      }
    }} className="grow" name="password" placeholder={'Your password'} type={'password'} inputRef={passwordRef} />

    <TextField slotProps={{
      input: {
        startAdornment: <IoIosLock className=' w-6 h-6 mr-5' />
      }
    }} className="grow" name="repeatpassword" placeholder={'Repeat password'} type={'password'} inputRef={repeatPasswordRef} />

    <TextField slotProps={{
      input: {
        startAdornment: <MdPerson className=' w-6 h-6 mr-5' />
      }
    }} className="grow" name="firstname" placeholder={'Your first name'} inputRef={firstNameRef} />


    <TextField slotProps={{
      input: {
        startAdornment: <MdPerson className=' w-6 h-6 mr-5' />
      }
    }} className="grow" name="lastname" placeholder={'Your last name'} inputRef={lastNameRef} />

    {image && <img src={URL.createObjectURL(image)} className='w-72 rounded-full h-72 object-cover m-auto'></img>}
    <div className="m-auto w-max">
      <FileInput className={'btn-teal dark:btn-grey'} onChange={e => setImage(e.target.files[0])} accept={'image/*'} />
    </div>
    <Button variant="contained" onClick={handleRegister}>Tạo mới</Button>
  </div>
}