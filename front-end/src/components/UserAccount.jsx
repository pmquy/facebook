import { useContext } from "react"
import CommonContext from "../store/CommonContext"
import { Link } from "react-router-dom"
import { MdAccountCircle } from "react-icons/md"
import Image from './Image'

export default function ({ id }) {
  const { users } = useContext(CommonContext)
  const user = users.filter(e => e._id == id)[0]
  return <div className="flex justify-start">
    <Link to={'/user/' + id} className="flex gap-2 items-center">
      {user.avatar ?
        <Image needToNavigate={false} id={user.avatar} className={'w-8 h-8 rounded-full object-cover'} />
        :
        <MdAccountCircle className="w-8 h-8" />
      }
      <div className="text-1">{user.firstName + " " + user.lastName}</div>
    </Link>
  </div>
}