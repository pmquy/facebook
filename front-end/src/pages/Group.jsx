<<<<<<< HEAD
import { Post, CreatePost, PostApi } from '../features/post'
=======
import { Button, Divider, IconButton } from "@mui/material"
import { BsThreeDots } from "react-icons/bs"
>>>>>>> ee36890 (fix:redis)
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"
import { GroupApi, GroupContext, Members } from '../features/group'
import { CreatePost, Posts } from '../features/post'


function Posts({ group }) {
  const query = useQuery({
    queryKey: ['posts', { group: group }],
    queryFn: () => PostApi.get({ group: group })
  })
  if (query.isError || query.isLoading) return <></>
  return <div className=' flex flex-col gap-3'>
    <CreatePost />
    {query.data.map(e => <div key={e._id}><Post id={e._id} /></div>)}
    <div>Loading more posts</div>
  </div>
}


export default function () {
  const params = useParams()
  const id = params.id
  const sub = params.sub
  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => GroupApi.getById(id)
  })

  if (query.error || query.isLoading) return <></>

  const group = query.data

<<<<<<< HEAD
  return <GroupContext.Provider value={{ group: query.data }}>
    <div className="flex flex-col gap-3">
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
      {
        query.data.role == '' ? <div className="card dark:card-black p-5 flex flex-col gap-5"><RegisterGroup id={id} /></div> :
        query.data.role == 'Requester' ? <div className=' card dark:card-black p-5'>Your request has been sent</div> :
        sub == 'posts' ? <Posts group={id}/> :
        sub == 'members' ? <div><Members id={id} /></div> :
        <div></div>
      }
=======
  return <GroupContext.Provider value={{ group: group }}>
    <div className="flex flex-col gap-5">

      <div className="rounded-md bg-surface text-onSurface overflow-hidden">
        <img src={group.avatar ? group.avatar.url : 'https://social.webestica.com/assets/images/bg/01.jpg'} className="w-full h-40 object-cover"></img>
        <div className="p-5 flex flex-col gap-5">
          <div className="flex gap-2 items-center">
            <img src={group.avatar ? group.avatar.url : 'https://social.webestica.com/assets/images/avatar/01.jpg'} className="w-20 h-20 rounded-full object-cover"></img>
            <div className="ml-5">
              <div className="text-xl font-semibold">{group.name}</div>
              <div className="flex gap-2 items-center">
                <div className="">Private group</div>
                <div className="">&#x2022;</div>
                <div className="">2372 members</div>
              </div>
            </div>
            <div className="grow"></div>
            <Button variant="outlined" color="primary">Joined</Button>
            <Button variant="outlined" color="success">Invite</Button>
            <IconButton><BsThreeDots className="w-4 h-4" /></IconButton>
          </div>
          <div className="flex gap-5 relative items-center">
            {
              new Array(9).fill(0).map((e, i) => <div className="h-8">
                <img className="w-8 h-8 absolute rounded-full border-2 border-surface object-cover" src={`https://social.webestica.com/assets/images/avatar/0${i + 1}.jpg`}></img>
              </div>)
            }
            <div className="h-8"><div className="w-8 h-8 absolute rounded-full border-2 border-surface bg-primary text-onPrimary text-[10px] text-center content-center">20+</div></div>
            <div className="ml-5 text-sm">Pmquy, Pmqafs and 20+ joined</div>
          </div>
          <Divider />
          <div className="flex gap-1 pb-3 overflow-y-auto">
            <Link to={`/groups/${id}/posts`} className={`${sub == 'posts' ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2 `}>Posts</Link>
            <Link to={`/groups/${id}/about`} className={`${sub == 'about' ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2 `}>About</Link>
            <Link to={`/groups/${id}/connections`} className={`${sub == 'connections' ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2 `}>Connections</Link>
            <Link to={`/groups/${id}/media`} className={`${sub == 'media' ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2 `}>Media</Link>
            <Link to={`/groups/${id}/videos`} className={`${sub == 'files' ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2 `}>Videos</Link>
            <Link to={`/groups/${id}/events`} className={`${sub == 'events' ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2 `}>Events</Link>
          </div>
        </div>
      </div>

      <div>
        {sub === 'posts' && <div className="flex flex-col gap-5">
          <CreatePost />
          <Posts query={{ group: id }} />
        </div>}

        {sub === 'connections' && <Members id={id} />}
      </div>
>>>>>>> ee36890 (fix:redis)
    </div>
  </GroupContext.Provider>
}