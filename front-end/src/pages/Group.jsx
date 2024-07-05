import { Posts, CreatePost } from '../features/post'
import { useQuery } from "react-query"
import { File } from '../components'
import { Link, useParams } from "react-router-dom"
import { GroupApi, GroupContext, Members, RegisterGroup } from '../features/group'

export default function () {
  const params = useParams()
  const id = params.id
  const sub = params.sub
  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => GroupApi.getById(id)
  })
  if (query.error || query.isLoading) return <></>


  return <GroupContext.Provider value={{ group: query.data }}>
    <div className="flex flex-col gap-5">
      <div className="card dark:card-black p-5 flex flex-col gap-5">
        <div className=" rounded-lg overflow-hidden" style={{ background: 'linear-gradient(to left top, #222831, #00ADB5)' }}>
          <div className="m-auto max-w-max"><File needToNavigate={true} id={query.data.avatar} /></div>
        </div>
        <div className="text-1 text-xl">{query.data.name}</div>
        <div><span className="text-1">Mô tả: </span>{query.data.description}</div>
        <div className="flex gap-5">
          <Link to={`/groups/${id}/posts`} className={`${sub == 'posts' ? 'btn-teal-n' : 'dark:btn-black btn-white'}`}>Thảo luận</Link>
          <Link to={`/groups/${id}/members`} className={`${sub == 'members' ? 'btn-teal-n' : 'dark:btn-black btn-white'}`}>Thành viên</Link>
          <Link to={`/groups/${id}/events`} className={`${sub == 'events' ? 'btn-teal-n' : 'dark:btn-black btn-white'}`}>Sự kiện</Link>
          <Link to={`/groups/${id}/media`} className={`${sub == 'media' ? 'btn-teal-n' : 'dark:btn-black btn-white'}`}>File phương tiện</Link>
          <Link to={`/groups/${id}/files`} className={`${sub == 'files' ? 'btn-teal-n' : 'dark:btn-black btn-white'}`}>File</Link>
        </div>
      </div>
      {query.data.role == '' ? <div className="card dark:card-black p-5 flex flex-col gap-5"><RegisterGroup id={id} /></div> :
        query.data.role == 'Requester' ? <div className=' card dark:card-black p-5'>Your request has been sent</div> :
        sub == 'posts' ? <div><CreatePost /><Posts /></div> :
          sub == 'members' ? <div><Members id={id} /></div> :
          <div></div>}
    </div>
  </GroupContext.Provider>
}