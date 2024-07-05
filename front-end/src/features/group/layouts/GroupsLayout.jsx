import { useQuery } from "react-query"
import { UserApi } from '../../account'
import GroupAccount from "../components/GroupAccount"
import { Link, Outlet, useParams } from "react-router-dom"
import GroupsContext from '../store/GroupsContext'
import CreateGroup from '../components/CreateGroup'


export default function GroupsLayout() {

  const params = useParams()

  const query = useQuery({
    queryKey: ['registered_group'],
    queryFn: () => UserApi.getGroups({})
  })

  if (query.isLoading || query.isError) return <></>

  return <GroupsContext.Provider value={{ groups: query.data }}>
    <div className="flex fixed z-[5] top-0 left-0 w-screen h-screen pt-16">

      <div className={`flex flex-col gap-5 p-5 min-w-96 overflow-y-auto relative ${params.id ? 'max-md:hidden' : ''}`}>
        <div className="btn-teal"><CreateGroup /></div>
        <Link to={'/groups/feed'} className=" px-5 py-2 text-2xl hover:bg-teal rounded-lg">Bảng feed của bạn</Link>
        <Link to={'/groups/discover'} className=" px-5 py-2 text-2xl hover:bg-teal rounded-lg">Khám phá</Link>
        <hr />
        <div className=" flex flex-col gap-2">
          <div className=" text-2xl">Nhóm bạn đã tham gia</div>
          {query.data.map(e => <div className={`px-5 py-2 rounded-lg ${params.id == e ? 'bg-teal' : 'hover:bg-teal'}`} key={e}><GroupAccount id={e} /></div>)}
        </div>
      </div>

      <div className={`flex-grow overflow-y-auto p-5 border-teal border-l-2  ${params.id ? '' : 'max-md:hidden'}`}>
        <Outlet />
      </div>

    </div>
  </GroupsContext.Provider >
}