import Header from "./Header";
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useUser from "../features/account/hooks/useUser";
import UserContext from "../features/account/store/userContext";

export default function () {

  const [user, setUser] = useUser()

  return <UserContext.Provider value={{ user: user, setUser: setUser }}>
    <ToastContainer />
    <div className="overflow-x-hidden min-h-screen bg-white_1">
      <Header />      
      <div className="p-5 mt-16"><Outlet /></div>      
    </div>
  </UserContext.Provider>
}