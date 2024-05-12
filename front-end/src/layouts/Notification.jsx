import { useContext, useState } from "react"
import { IoIosNotifications } from "react-icons/io"
import { useQuery, useQueryClient } from 'react-query'
import CommonContext from '../store/CommonContext'
import { useNavigate } from "react-router-dom"
import api from '../services/notification'
export default function () {
  const [open, setOpen] = useState(false)
  const { user , darkMode} = useContext(CommonContext)
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
    <div className={`max-sm:fixed  max-sm:top-16 max-sm:left-0 max-sm:translate-y-0 max-sm:w-full absolute h-max w-max sm:max-w-[500px] flex flex-col overflow-y-auto -bottom-2 translate-y-full right-0 dark:bg-black bg-teal rounded-b-lg transition-all duration-500 ${open ? 'max-h-[400px]' : 'max-h-0'}`}>
      {query.data.map(e => <div key={e._id} className="btn dark:hover:bg-teal hover:bg-grey text-white py-2 px-5" onClick={() => handleClick(e)}>{e.content}</div>)}
    </div>
    <button onClick={() => setOpen(!open)} className={` p-2 rounded-full group ${open ? 'bg-black' : 'hover:bg-teal '}` }>
      <IoIosNotifications color={`${open ? '#00ADB5' : `${darkMode ? '#EEEEEE' : '#222831'}`}`} className="w-8 h-8" />
    </button>
  </div>
}