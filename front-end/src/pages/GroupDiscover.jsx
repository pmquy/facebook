import { useQuery } from 'react-query'
import {GroupApi, RegisterGroup} from '../features/group'
import { File } from '../components'

export default function GroupDiscover() {
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupApi.get({})
  })
  
  if(query.isLoading || query.isError) return <></>

  return <div className=' grid gap-5' style={{gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'}}>
    {query.data.map(e => <div key={e._id} className='card dark:card-black p-5 flex flex-col gap-5'>
      <File id={e.avatar}/>
      {e.name}
      <RegisterGroup id={e._id}/>
    </div>)}
  </div>
};
