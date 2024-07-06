import { useRef } from 'react'
import { IoIosLock } from "react-icons/io"
import { MdEmail } from "react-icons/md"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUser } from '../../../hooks/user'
import api from '../services/api'
import { Checkbox, Button, TextField } from '@mui/material'


export default function () {
  const { setUser } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault()
    api.login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then(user => { setUser(user); navigate(location.state?.url ? location.state.url : '/') })
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <form onSubmit={handleLogin} className="flex flex-col gap-5">
    <div className="text-4xl font-bold text-center">Sign In</div>
    <div className=''>Don't have an account? <Link to={'/register'} className="text-primary text-center">Click here to sign up</Link></div>

    <TextField slotProps={{
      input: {
        startAdornment: <MdEmail className=' w-6 h-6 mr-5' />
      }
    }} variant="outlined" className="grow" name="email" type='email' placeholder='Your email' inputRef={emailRef} />

    <TextField slotProps={{
      input: {
        startAdornment: <IoIosLock className=' w-6 h-6 mr-5' />
      }
    }}
      variant="outlined" className="grow" name="password" placeholder='Your password' type={'password'} inputRef={passwordRef} />

    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Checkbox defaultChecked />
        <div>Remember me?</div>
      </div>
      <Link to={'/forgot-password'} className='text-primary'>Forgot password?</Link>
    </div>
    <Button onClick={handleLogin} variant="contained">Đăng Nhập</Button>
  </form>
}