import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "../store/CommonContext";
import { useQueries, useQueryClient } from "react-query";
import UserApi from '../services/user'
import { useState } from "react";
import socket from '../socket'

export default function () {
  const queryClient = useQueryClient()
  const chain = Promise.resolve()
  socket.on('invalidate', keys => {
    chain.then(keys => queryClient.invalidateQueries(keys))
  })
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

  return <CommonContext.Provider value={{ user: user, setUser: setUser, users: query[1].data, socket : socket}}>
    <ToastContainer />
    <div className="overflow-x-hidden min-h-screen bg-white_1">
      <Header />
      <div className="p-5 mt-16"><Outlet /></div>
    </div>
  </CommonContext.Provider>
}