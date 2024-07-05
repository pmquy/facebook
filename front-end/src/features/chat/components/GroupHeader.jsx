import { useQuery } from "react-query";
import api from '../services/groupChat'
import Call from "./Call";
import GroupInfo from "./GroupInfo";
export default function ({ id }) {
  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => api.getById(id)
  })
  if (query.isLoading || query.isError) return <></>
  return <div className="flex gap-5 items-center text-white_0 text-1">
    <div>{query.data.name}</div>
    <Call id={id}/>
    <GroupInfo id={id}/>
  </div>
}