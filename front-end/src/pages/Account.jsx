import { Link, useParams } from "react-router-dom";
import {Account} from "../features/account";
import {UpdateForm, UserContext, ChangePasswordForm} from '../features/account'
import { useContext } from "react";

export default function () {
  const {user} = useContext(UserContext)
  const params = useParams()

  return <div className="flex flex-col gap-5 items-center">
    <Account userId={params.id}/>
    {user && params.id == user._id && <UpdateForm/>}
    {user && params.id == user._id && <ChangePasswordForm/>}
    <Link to={'/login'} className="btn-1">Đăng xuất</Link>
  </div>
}