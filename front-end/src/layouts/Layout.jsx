import Header from "./Header";
import { Outlet } from 'react-router-dom'

export default function () {
  return <div className=" overflow-x-hidden min-h-screen">
    <Header />
    <div className="translate-y-16 p-5">
      <Outlet />    
    </div>    
  </div>
}