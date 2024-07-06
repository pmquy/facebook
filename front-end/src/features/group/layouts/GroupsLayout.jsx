import { useQuery } from "react-query"
import { Outlet, useParams } from "react-router-dom"
import MainNavBar from "../../../components/MainNavBar"
import { UserApi } from '../../account'
import GroupsContext from '../store/GroupsContext'


export default function GroupsLayout() {

  const params = useParams()

  const query = useQuery({
    queryKey: ['registered_group'],
    queryFn: () => UserApi.getGroups({}),
    initialData: []
  })

  return <GroupsContext.Provider value={{ groups: query.data }}>
    <div className="flex bg-background gap-5 py-5 sm:px-3 max-w-[1300px] mx-auto max-lg:flex-col">

      <div className="basis-1/4">
        <MainNavBar />
      </div>

      <div className={`basis-3/4`}>
        <Outlet />
      </div>

    </div>
  </GroupsContext.Provider >
}