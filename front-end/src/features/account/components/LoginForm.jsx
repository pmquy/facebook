import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import CommonContext from '../../../store/CommonContext'
import { MdPhoneIphone } from "react-icons/md";
import { IoIosLock } from "react-icons/io";

export default function () {
  const {setUser} = useContext(CommonContext)
  const navigate = useNavigate()
  const phoneNumberRef = useRef(),
    passwordRef = useRef()

  const handleLogin = (e) => {
    e.preventDefault()
    api.login({
      phoneNumber: phoneNumberRef.current.value,
      password: passwordRef.current.value,
    })
      .then(user => {setUser(user); navigate('/')})           
      .catch(err => toast(err.message, {type : 'error'}))
  }

  return <form onSubmit={handleLogin} className="flex flex-col gap-5">
    <div className="flex gap-5 items-center justify-between border-b-2 border-black pb-1">
      <MdPhoneIphone className=' w-6 h-6'/>
      <Input name="phonenumber" placeholder='Your phonenumber' ref={phoneNumberRef}/>
    </div>
    <div className="flex gap-5 items-center justify-between border-b-2 border-black pb-1">
      <IoIosLock className='w-6 h-6'/>
      <Input name="password" placeholder='Your password' type={'password'} ref={passwordRef}/>
    </div>
    <Button onClick={handleLogin} className={'m-auto btn-1'}>Đăng Nhập</Button>
    <Link to={'/register'} className='hover:text-red_0 text-1 underline text-center'>Đăng kí tài khoản mới</Link>
  </form>
}