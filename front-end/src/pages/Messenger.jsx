import { IconButton, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useSearchParams } from 'react-router-dom';
import { CreateGroupChat, CreateMessage, GroupChatCard, GroupChatsWrapper, GroupHeader, Messages } from '../features/chat';

function Messenger ({groupchats, loadMore, hasMore}) {

  const [param, setParam] = useSearchParams()
  const id = param.get('id')

  return <div className='p-3 bg-background h-[calc(100vh-4rem)] max-w-[1200px] mx-auto'>

    <div className="bg-surface text-onSurface rounded-lg shadow flex h-full overflow-hidden">

      <div className={`flex flex-col h-full w-96 ${id ? 'max-md:hidden border-r-2 border-primary/50' : 'grow'}`}>

        <div className="flex gap-3 items-center border-b-2 border-primary/50 p-5">
          <div className="text-xl font-semibold">Active chats</div>
          <div className="p-1 rounded-lg bg-green-200 bg-opacity-30 text-green-600">{groupchats.length}</div>
          <div className="grow"></div>
          <CreateGroupChat />
        </div>

        <div className="p-5">
          <TextField label="Search for chat" variant="outlined" fullWidth slotProps={
            {
              input: {
                endAdornment: <IconButton color="primary"><FaSearch className="w-4 h-4" /></IconButton>
              }
            }
          } />
        </div>
        <div className='overflow-y-auto p-5 flex flex-col gap-3'>
          {
            groupchats.map(e => <div className={`${id == e._id ? 'bg-primary/20' : 'hover:bg-background'} cursor-pointer `} onClick={() => { param.set('id', e._id); setParam(param) }} key={e._id}>
              <GroupChatCard groupchat={e} />
            </div>)
          }
        </div>
      </div>

      {id && <div className={`${id ? '' : 'max-md:hidden'} grow flex flex-col max-h-screen`}>
        <div className="sticky z-1 bg-surface text-primary p-5 top-0 flex justify-between">
          <IconButton color="primary" onClick={() => { param.delete('id'); setParam(param) }}><FaCircleArrowLeft className="w-6 h-6" /></IconButton>
          <GroupHeader id={id} />
        </div>
        <div className="grow p-5 overflow-y-auto border-y-2 border-primary/50">
          <Messages key={id} id={id} />
        </div>
        <div className=" bg-surface text-onSurface p-5"><CreateMessage id={id} /></div>
      </div>}
    </div>

  </div>
}

export default function Page() {
  return <GroupChatsWrapper>
    <Messenger />
  </GroupChatsWrapper>
}