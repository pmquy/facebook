import { useQueries } from "react-query";
import MessageApi from '../services/message'
import CallApi from '../services/call'
import Image from '../../../components/Image'
import Video from '../../../components/Video'
import UserAccount from '../../../components/UserAccount'
import { useContext, useMemo } from "react";
import CommonContext from "../../../store/CommonContext";

export default function ({ id }) {
  const { user } = useContext(CommonContext)
  const query = useQueries([
    {
      queryKey: ['messages', { groupChat: id }],
      queryFn: () => MessageApi.get({ groupChat: id })
    },
    {
      queryKey: ['calls', { groupChat: id }],
      queryFn: () => CallApi.get({ groupChat: id })
    }
  ])
  const all = useMemo(() => {
    if (query.some(e => e.isError || e.isLoading)) return
    return [...query[0].data.map(e => { return { ...e, type: 0 } }), ...query[1].data.map(e => { return { ...e, type: 1 } })].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }, [query[0].data, query[1].data])
  if (query.some(e => e.isError || e.isLoading)) return <></>

  return <div className="flex flex-col gap-10">
    {all.map(e => <div className={`flex flex-col gap-2 ${e.user == user._id ? 'items-end ' : 'items-start'}`} key={e._id}>
      <UserAccount id={e.user} />
      {e.type == 0 && <div className={`${e.user == user._id ? 'card-teal' : 'card dark:card-black'} p-3 flex flex-col gap-5`}>
        {e.content}
        {e.images.map(t => <Image className={'w-96'} id={t} />)}
        {e.videos.map(t => <Video className={'w-96'} id={t} />)}
      </div>}
      {e.type == 1 && <div className={`${e.user == user._id ? 'card-teal' : 'card dark:card-black'} p-3 flex flex-col gap-5`}>
        <div>Đã bắt đầu một cuộc gọi</div>
        {e.status ? 'Đã kết thúc' : 'Đang diễn ra'}
      </div>}
    </div>)}
  </div>
}