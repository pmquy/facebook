import { Link, useParams } from "react-router-dom";
import {Account} from "../features/account";
import {UpdateForm, ChangePasswordForm} from '../features/account'
import { useContext } from "react";
import CommonContext from "../store/CommonContext";

export default function () {
  const {user} = useContext(CommonContext)
  const params = useParams()

  if(!user) return <>fd</>

  return <div className="flex flex-col gap-5 items-center">
    <Account userId={params.id}/>
    {user && params.id == user._id && <UpdateForm/>}
    {user && params.id == user._id && <ChangePasswordForm/>}    
    {user && params.id == user._id && <Link to={'/login'} className="btn-1">Đăng xuất</Link>}    
  </div>
}