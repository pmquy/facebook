import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "../store/CommonContext";
import { useQueries } from "react-query";
import UserApi from '../services/user'
import {useUser, useSocket} from '../hooks'

export default function () {
  const socket = useSocket()
  const [user, setUser, isLoading] = useUser()
  const query = useQueries([
    {
      queryKey: ['users'],
      queryFn: () => UserApi.get()
    }
  ])  
  if (isLoading || query.some(e => e.isLoading || e.isError)) return <div></div>

  return <CommonContext.Provider value={{ user: user, setUser: setUser, users: query[0].data, socket : socket}}>
    <ToastContainer />
    <div className="overflow-x-hidden min-h-screen bg-white_1">
      {user && <Header/>}
      <div className="mt-16"><Outlet /></div>
    </div>
  </CommonContext.Provider>
}