import { useState } from "react"
import { IoIosNotifications } from "react-icons/io"
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom"
import api from '../services/notification'
import { useUser } from "../hooks/user"
import { IconButton } from "@mui/material"
export default function () {
  const [open, setOpen] = useState(false)
  const {user} = useUser()
  const query = useQuery({
    queryKey: ['notifications', user._id],
    queryFn: () => api.get({q : {}})
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
    <div className={`max-sm:fixed  max-sm:top-16 max-sm:left-0 max-sm:translate-y-0 max-sm:w-full absolute h-max w-max sm:max-w-[500px] flex flex-col overflow-y-auto -bottom-2 translate-y-full right-0 bg-surface text-onSurface shadow-md rounded-b-lg transition-all duration-500 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
      {query.data.map(e => <button key={e._id} className="hover:bg-secondary py-2 px-5 " onClick={() => handleClick(e)}>{e.content}</button>)}
    </div>
    <IconButton onClick={() => setOpen(!open)} color={open ? 'primary' : 'inherit'}>
      <IoIosNotifications className="w-6 h-6" />
    </IconButton>
  </div>
}