import { Button, Divider, MenuItem, Select } from "@mui/material";
import { CreateGroup, GroupApi } from "../features/group";
import { useEffect, useState } from "react";
import { Posts } from "../features/post";
import { UserApi } from "../features/account";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";


function GroupCard({ id }) {
  const query = useQuery({
    queryKey: ['group', id],
    queryFn: () => GroupApi.getById(id)
  })
  if (query.error || query.isLoading) return <></>
  const group = query.data

  return <div className="rounded-md overflow-hidden border-2 flex flex-col gap-4">
    <div className="relative pb-8">
      <img className="w-full h-20 object-cover" src={group.cover.url}></img>
      <img className="w-16 h-16 rounded-full border-2 border-surface object-cover absolute -translate-y-1/2 left-1/2 -translate-x-1/2" src={group.avatar.url}></img>
    </div>

    <div className="text-center">
      <Link to={`/groups/${id}/posts`} className="font-semibold text-xl hover:text-primary">{group.name}</Link>
      <div className=" text-sm">Public group</div>
    </div>

    <div className="flex gap-2 justify-center text-sm">
      <div className=" text-center basis-1/3"><div className="font-semibold">{1032}</div> Members</div>
      <Divider orientation="vertical" flexItem />
      <div className="text-center basis-1/3"><div className="font-semibold">{429}</div> Posts per day</div>
    </div>

    <div className="flex gap-5 relative justify-center h-8">
      {
        new Array(5).fill(0).map((e, i) => <div>
          <img className="w-8 h-8 absolute rounded-full -translate-x-1/2 border-2 border-surface object-cover" src={`https://social.webestica.com/assets/images/avatar/0${i + 1}.jpg`}></img>
        </div>)
      }
    </div>


    <div className="p-3 border-t-2">
      <div className="mx-auto w-max">
        <Button variant="outlined">Join</Button>
      </div>
    </div>
  </div>
}

export default function Groups() {

  const [nav, setNav] = useState(0)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    if (nav === 0) {
      UserApi.getGroups({}).then(res => {
        setGroups(res)
      })
    }
  }, [nav])

  return <div className="flex flex-col gap-10">

    <div className="p-5 rounded-md shadow bg-surface text-onSurface flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <div className="font-semibold text-2xl">Group</div>
        <div className="grow"></div>
        <Select variant="outlined" defaultValue="Alphabetical">
          <MenuItem value="Alphabetical">Alphabetical</MenuItem>
          <MenuItem value="Most members">Most members</MenuItem>
          <MenuItem value="Newest group">Newest group</MenuItem>
          <MenuItem value="Recently active">Recently active</MenuItem>
        </Select>
        <CreateGroup />
      </div>
      <div className="flex gap-1 text-nowrap overflow-y-auto pb-3 select-none">
        {['Joined groups', `Friends's groups`, 'Suggested for you', 'Popular near you',].map((e, i) => <div key={i} onClick={() => { setNav(i) }} className={`${nav === i ? 'text-primary border-primary' : 'hover:text-primary/50 border-transparent'} font-semibold px-4 pb-1 cursor-pointer border-b-2`}>{e}</div>)}
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {groups.map(e => <div key={e}><GroupCard id={e} /> </div>)}
      </div>
      <Button variant="text">View more</Button>
    </div>

    <div className="p-5 rounded-md shadow bg-surface text-onSurface flex flex-col gap-5">
      <div className="flex gap-5 items-center">
        <div className="font-semibold text-2xl">Post</div>
        <div className="grow"></div>
        <Select variant="outlined" defaultValue={"Recently"}>
          <MenuItem value="Recently">Recently</MenuItem>
          <MenuItem value="Top">Top</MenuItem>
          <MenuItem value="Most commented">Most commented</MenuItem>
          <MenuItem value="Most shared">Most shared</MenuItem>
        </Select>
      </div>
    </div>
    <Posts api={GroupApi.getPosts} />
  </div>
}