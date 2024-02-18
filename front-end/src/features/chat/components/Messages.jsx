import { useQueries } from "react-query";
import MessageApi from '../services/message'
import CreateMessage from './CreateMessage'
import Image from '../../../components/Image'
import UserAccount from '../../../components/UserAccount'
import { useContext } from "react";
import CommonContext from "../../../store/CommonContext";

export default function ({id}) {
  const {user} = useContext(CommonContext)  
  const query = useQueries([
    {
      queryKey : ['messages', id],
      queryFn : () => MessageApi.get({groupChat : id})
    }
  ])  
  if(query.some(e => e.isError || e.isLoading)) return <></>
  return <div className="flex flex-col gap-10">
    {query[0].data.map(e => <div className={`flex flex-col gap-2 ${e.user == user._id ? 'items-end' : 'items-start'}`} key={e._id}>
      <UserAccount id={e.user}/>
      <div className="card_1 p-5 flex flex-col gap-5">
        {e.content}
        {e.image && <Image className={'w-96'} id={e.image}/>}
      </div>     
    </div>)}    
  </div>
}