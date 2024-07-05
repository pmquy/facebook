import { Link } from "react-router-dom"
import { MdAccountCircle } from "react-icons/md"
import { File } from "../../../components"
import { useQuery } from "react-query"
import GroupApi from "../services/GroupApi"

export default function ({ id }) {

  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => GroupApi.getById(id)
  })

  if (query.isLoading || query.isError) return <></>

  return <div>
    <Link to={'/groups/' + id + '/posts'} className="flex gap-2 items-center">
      {query.data?.avatar ? <File id={query.data.avatar} className={'w-8 h-8 min-w-8 min-h-8 rounded-full object-cover'} /> :
        <MdAccountCircle className="w-8 h-8" />}
      <div className="text-1">{query.data.name}</div>
    </Link>
  </div>
}