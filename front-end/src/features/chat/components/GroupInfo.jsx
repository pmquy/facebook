import { useState } from "react"
import { FaCircleInfo } from "react-icons/fa6"
import { useQuery } from "react-query"
import api from '../services/groupChat'

export default function GroupInfo({id}) {
  const [open, setOpen] = useState(false)
  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => api.getById(id)
  })

  return <div className=" relative">
    <FaCircleInfo onClick={() => setOpen(!open)} className="w-8 h-8"/>
    <div className={`absolute right-0 ${open ? '' : ' translate-x-'}`}>
      
    </div>
  </div>
};
