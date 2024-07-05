import { useQuery, useQueryClient } from "react-query"
import GroupApi from "../services/GroupApi"
import { UserAccount } from "../../../components"
import { toast } from "react-toastify"
import { Button } from "../../../components/ui"
import { useContext } from "react"
import GroupContext from "../store/GroupContext"

export default function ({ id }) {
  const { group } = useContext(GroupContext)
  const query = useQuery({
    queryKey: ['members', { group: id }],
    queryFn: () => GroupApi.getMembersById(id)
  })
  const queryClient = useQueryClient()

  if (query.isLoading || query.isError) return <></>

  const handleAccept = (user) => {
    GroupApi.accept(id, user)
      .then(() => queryClient.invalidateQueries(['members', { group: id }]))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  const handleDelete = (user) => {
    GroupApi.delete(id, user)
      .then(() => queryClient.invalidateQueries(['members', { group: id }]))
      .catch(err => toast(err.message, { type: 'error' }))
  }

  return <div className="card dark:card-black p-5 flex flex-col gap-5">
    {query.data.map(e => <div className=" flex gap-5 items-center" key={e._id}>
      <UserAccount id={e.user} />
      {<div>{e.role}</div>}
      {group.role == 'Admin' && e.role == 'Requester' && <Button className={'dark:btn-grey btn-teal'} onClick={() => handleAccept(e.user)}>Chấp nhận</Button>}
      {group.role == 'Admin' && e.role != 'Admin' && <Button className={'dark:btn-grey btn-teal'} onClick={() => handleDelete(e.user)}>Xoá</Button>}
    </div>)}
  </div>
}