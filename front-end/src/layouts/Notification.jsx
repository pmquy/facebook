import { useContext, useState } from "react"
import { IoIosNotifications } from "react-icons/io"
import { useQuery, useQueryClient } from 'react-query'
import CommonContext from '../store/CommonContext'
import { useNavigate } from "react-router-dom"
import api from '../services/notification'
import { useUser } from "../hooks/user"
export default function () {
  const [open, setOpen] = useState(false)
  const { darkMode} = useContext(CommonContext)
  const {user} = useUser()
  const query = useQuery({
    queryKey: ['notifications', user._id],
    queryFn: () => api.get().then(val => { return val})
  })
  const queryClient = useQueryClient()
  const navigate = useNavigate()  
  if (query.isError || query.isLoading) return <></>
  const handleClick = e => {
    if (e.key) queryClient.invalidateQueries(JSON.parse(e.key))
    if (e.to) navigate(e.to)
    setOpen(false)
  }
  return <div className="relative">
    <div className={`max-sm:fixed  max-sm:top-16 max-sm:left-0 max-sm:translate-y-0 max-sm:w-full absolute h-max w-max sm:max-w-[500px] flex flex-col overflow-y-auto -bottom-2 translate-y-full right-0 dark:bg-black bg-teal rounded-b-lg transition-all duration-500 ${open ? 'max-h-[400px]  border-2 border-black dark:border-teal' : 'max-h-0'}`}>
      {query.data.map(e => <div key={e._id} className="btn dark:hover:bg-teal hover:bg-grey text-white py-2 px-5" onClick={() => handleClick(e)}>{e.content}</div>)}
    </div>
    <button onClick={() => setOpen(!open)} className={` p-2 rounded-full group ${open ? 'bg-teal text-white' : 'hover:bg-teal hover:text-white'} text-black dark:text-white` }>
      <IoIosNotifications className="w-8 h-8" />
    </button>
  </div>
}