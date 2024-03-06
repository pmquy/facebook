import { useQuery } from "react-query";
import api from '../services/groupChat'
import { FaCircleInfo } from "react-icons/fa6";
import Call from "./Call";
export default function ({ id }) {
  const query = useQuery({
    queryKey: ['groups', id],
    queryFn: () => api.getById(id)
  })
  if (query.isLoading || query.isError) return <></>
  return <div className="flex gap-5 items-center text-white_0 text-1">
    <div>{query.data.name}</div>
    <Call id={id}/>
    <FaCircleInfo className="w-8 h-8"/>
  </div>
}