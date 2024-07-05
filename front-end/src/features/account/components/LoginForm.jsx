import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import {toast} from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { useUser } from '../../../hooks/user'

export default function () {
  const {setUser} = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const emailRef = useRef(),
    passwordRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault()
    api.login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then(user => {setUser(user); navigate(location.state?.url ? location.state.url : '/')})           
      .catch(err => toast(err.message, {type : 'error'}))
  }

  return <form onSubmit={handleLogin} className="flex flex-col gap-5">
    <div className="flex gap-5 items-center justify-between">
      <MdEmail className=' w-6 h-6'/>
      <Input className=" bg-white dark:bg-black text-black dark:text-white" name="email" placeholder='Your email' ref={emailRef}/>
    </div>
    <div className="flex gap-5 items-center justify-between">
      <IoIosLock className='w-6 h-6'/>
      <Input className=" bg-white dark:bg-black text-black dark:text-white" name="password" placeholder='Your password' type={'password'} ref={passwordRef}/>
    </div>
    <Button onClick={handleLogin} className={'m-auto btn-teal dark:btn-grey'}>Đăng Nhập</Button>
    <Link to={'/register'} className='hover:text-red_0 text-1 underline text-center'>Đăng kí tài khoản mới</Link>
  </form>
}