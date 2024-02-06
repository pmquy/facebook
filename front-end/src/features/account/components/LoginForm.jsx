import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../store/userContext'

export default function () {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const phoneNumberRef = useRef(),
    passwordRef = useRef()

  const handleLogin = () => {
    api.login({
      phoneNumber: phoneNumberRef.current.value,
      password: passwordRef.current.value,
    })
      .then(user => {
        setUser(user)
        navigate('/')
      })     
      .catch(err => toast(err.message, {type : 'error'}))
  }

  return <div className="flex flex-col gap-5 card m-auto w-full max-w-[400px]">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Số điện thoại</div>
      <Input ref={phoneNumberRef}/>
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Mật khẩu</div>
      <Input ref={passwordRef}/>
    </div>
    <Button onClick={handleLogin} className={'m-auto'}>Đăng Nhập</Button>
    <Link to={'/register'} className='text-1 underline text-center'>Đăng kí tài khoản mới</Link>
  </div>
}