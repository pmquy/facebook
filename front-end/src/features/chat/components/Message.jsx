import { useQuery } from 'react-query'
import MessageApi from '../services/message'
import { useUser } from '../../../hooks/user'
import { File, UserAccount } from '../../../components'
import { Button } from '../../../components/ui'

function Message({ message }) {
  return <div className=' flex flex-col gap-2'>
    {message.content}
    {message.files.map(t => <div key={t}><File needToNavigate={true} id={t} /></div>)}
  </div>
}


function Call({ call }) {
  return <div className=' flex flex-col gap-2'>
    <div>Đã bắt đầu một cuộc gọi</div>
    {call.status == 'ended' ? 'Đã kết thúc' : 'Đang diễn ra'}
  </div>
}

function Vote({ vote }) {
  return <div className=' flex flex-col gap-2'>
    {vote.content}
    {vote.files.map(t => <div key={t}><File needToNavigate={true} id={t} /></div>)}
    <div className="p-5 bg-grey rounded-lg flex flex-col gap-2">
      {vote.options.map(e => <div key={e.name} className=" flex gap-5 items-center justify-between">
        <div>{e.name}</div>
        <Button className={'btn-teal'}>Bình chọn</Button>
      </div>)}
    </div>
  </div>
}


export default function ({ id }) {
  const { user } = useUser()

  const query = useQuery({
    queryKey: ['message', id],
    queryFn: () => MessageApi.getById(id)
  })

  if (query.isLoading || query.isError) return <></>

  const message = query.data

  return <div className={`flex flex-col gap-2 ${message.user == user._id ? 'items-end ' : 'items-start'}`} key={id}>
    <UserAccount id={message.user} />
    <div className={`${message.user == user._id ? 'card-teal' : 'card dark:card-black'} p-3 flex flex-col gap-5 max-w-80`}>
      {message.type == 'message' && <Message message={message} />}
      {message.type == 'vote' && <Vote vote={message} />}
      {message.type == 'call' && <Call call={message} />}
    </div>
  </div>
};





