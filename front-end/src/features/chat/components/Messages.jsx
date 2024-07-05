import { useQuery } from "react-query";
import MessageApi from '../services/message';
import Message from './Message';

export default function ({ id }) {
  const query = useQuery(
    {
      queryKey: ['messages', { groupChat: id }],
      queryFn: () => MessageApi.get({ groupChat: id })
    }
  )

  if (query.isError || query.isLoading) return <></>

  return <div className="flex flex-col gap-10">
    {query.data.map(e => <div key={e._id}><Message id={e._id} /></div>)}
  </div>//
}