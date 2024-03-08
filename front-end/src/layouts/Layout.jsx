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
  const [user, setUser, isLoading] = useUser(socket)
  const query = useQueries([
    {
      queryKey: ['users'],
      queryFn: () => UserApi.get()
    }
  ])  
  if (isLoading || query.some(e => e.isLoading || e.isError)) return <div></div>
  return <CommonContext.Provider value={{ user: user, setUser: setUser, users: query[0].data, socket : socket}}>
    <ToastContainer />
    <div className=" bg-white_1 flex flex-col min-h-screen">
      {user && <Header/>}
      <div className=" flex-grow">
        <Outlet />
      </div>
    </div>
  </CommonContext.Provider>
}