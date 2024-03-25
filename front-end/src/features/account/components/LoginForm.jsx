import { Input, Button } from '../../../components/ui'
import { useContext, useRef } from 'react'
import api from '../services/api'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import CommonContext from '../../../store/CommonContext'

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

  return <form onSubmit={handleLogin} className="flex flex-col p-5 gap-5 card m-auto">
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Số điện thoại</div>
      <Input autoFocus={true} ref={phoneNumberRef}/>
    </div>
    <div className="flex gap-5 items-center justify-between">
      <div className='text-1'>Mật khẩu</div>
      <Input type={'password'} ref={passwordRef}/>
    </div>
    <Button onClick={handleLogin} className={'m-auto'}>Đăng Nhập</Button>
    <Link to={'/register'} className='text-1 underline text-center'>Đăng kí tài khoản mới</Link>
  </form>
}