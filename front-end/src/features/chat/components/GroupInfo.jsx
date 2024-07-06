import { useState } from "react"
import { FaCircleInfo } from "react-icons/fa6"
import { useQuery } from "react-query"
import api from '../services/groupChat'
import { IconButton } from "@mui/material"

export default function GroupInfo({ id }) {
  const [open, setOpen] = useState(false)
  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => api.getById(id)
  })

  return <div className=" relative">
    <IconButton onClick={() => setOpen(!open)} color="primary">
      <FaCircleInfo className="w-6 h-6" />
    </IconButton>
    <div className={`absolute right-0 ${open ? '' : ' translate-x-'}`}>

    </div>
  </div>
};
