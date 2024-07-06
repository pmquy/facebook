import { useContext } from "react"
import CommonContext from "../store/CommonContext"
import { Link } from "react-router-dom"
import { MdAccountCircle } from "react-icons/md"
import File from './File'

export default function ({ id }) {
  const { users } = useContext(CommonContext)
  const user = users.filter(e => e._id == id)[0]
  return <div className="w-max">
    <Link to={'/users/' + id} className="flex gap-2 items-center">
      {user.avatar ? <File id={user.avatar} className={'w-8 h-8 min-w-8 min-h-8 rounded-full object-cover'} /> :
        <MdAccountCircle className="w-8 h-8" />}
      <div className="text-1">{user.firstName + " " + user.lastName}</div>
    </Link>
  </div>
}