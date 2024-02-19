import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "../store/CommonContext";
import { useQueries, useQueryClient } from "react-query";
import UserApi from '../services/user'
import { useEffect, useState } from "react";
import socket from '../socket'
import {LoginForm} from '../features/account'

export default function () {
  const queryClient = useQueryClient()
  useEffect(() => {
    const chain = Promise.resolve()
    const listener = keys => {      
      console.log(keys)
      chain.then(() => queryClient.invalidateQueries(keys))
    }
    socket.on('invalidate',listener)
    return () => socket.off('invalidate', listener)
  }, [])
  const [user, setUser] = useState()
  const query = useQueries([
    {
      queryKey: ['me'],
      queryFn: () => UserApi.getMe().then(user => setUser(user)).catch(err => {}),
    },
    {
      queryKey: ['users'],
      queryFn: () => UserApi.get().catch(err => {})
    }
  ])

  if (query.some(e => e.isLoading || e.isError)) return <></>

  if(!user) return <LoginForm/>

  return <CommonContext.Provider value={{ user: user, setUser: setUser, users: query[1].data, socket : socket}}>
    <ToastContainer />
    <div className="overflow-x-hidden min-h-screen bg-white_1">
      <Header />
      <div className="p-5 mt-16"><Outlet /></div>
    </div>
  </CommonContext.Provider>
}