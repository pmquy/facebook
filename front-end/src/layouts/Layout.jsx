import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "../store/CommonContext";
import { useQueries, focusManager } from "react-query";
import UserApi from '../services/user'
import { useUser, useSocket } from '../hooks'
import { useEffect, useState } from "react";

export default function () {
  const socket = useSocket()
  const [user, setUser, isLoading] = useUser(socket)
  const [darkMode, setDarkMode] = useState()

  focusManager.setEventListener((handleFocus) => {
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('visibilitychange', handleFocus, false)
    }
    return () => window.removeEventListener('visibilitychange', handleFocus)
  })

  const query = useQueries([
    {
      queryKey: ['users'],
      queryFn: () => UserApi.get()
    }
  ])

  useEffect(() => {
    setDarkMode(window.matchMedia('"(prefers-color-scheme: dark)"'))
  }, [])

  if (isLoading || query.some(e => e.isLoading || e.isError)) return <div></div>
  return <CommonContext.Provider value={{ user: user, setUser: setUser, users: query[0].data, socket: socket, darkMode: darkMode, setDarkMode: setDarkMode }}>
    <ToastContainer />
    <div className={`${darkMode ? 'dark bg-grey text-white' : 'bg-white text-black'} min-h-screen`}>
      {user && <Header />}
      <Outlet />
    </div>
  </CommonContext.Provider>
}