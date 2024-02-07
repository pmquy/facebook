import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonContext from "../store/CommonContext";
import { useQueries } from "react-query";
import api from "../services/api";
import { useState } from "react";

export default function () {

  const [user, setUser] = useState()
  const query = useQueries([
    {
      queryKey: ['me'],
      queryFn: () => api.getMe().then(user => setUser(user)),
    },
    {
      queryKey: ['users'],
      queryFn: () => api.get()
    }
  ])

  if (query.some(e => e.isLoading || e.isError)) return <></>

  return <CommonContext.Provider value={{ user: user, setUser: setUser, users: query[1].data}}>
    <ToastContainer />
    <div className="overflow-x-hidden min-h-screen bg-white_1">
      <Header />
      <div className="p-5 mt-16"><Outlet /></div>
    </div>
  </CommonContext.Provider>
}