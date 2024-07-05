import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "../store/CommonContext";
import { useQueries } from "react-query";
import UserApi from '../services/user'
import { useRef, useState} from "react";
import { SocketProvider } from "../hooks/socket";
import { UserProvider } from "../hooks/user";


export default function () {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode') ? localStorage.getItem('darkmode') === 'true' : window.matchMedia('"(prefers-color-scheme: dark)"'))
  const ref = useRef()
  const query = useQueries([
    {
      queryKey: ['users'],
      queryFn: () => UserApi.get()
    }
  ])

  if (query.some(e => e.isLoading || e.isError)) return <></>

  return (
    <CommonContext.Provider value={{users: query[0].data, darkMode, setDarkMode, headerRef : ref}}>
      <SocketProvider>
        <UserProvider>
          <div className={`${darkMode ? 'dark bg-grey text-white' : 'bg-white text-black'} min-h-screen`}>
            <div ref={ref} className={`sticky z-10 top-0`}>
              <Header />
            </div> 
            <Outlet />
          </div>
        </UserProvider>
      </SocketProvider>
      
      <ToastContainer />
    </CommonContext.Provider>
  )
}