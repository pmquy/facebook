import { useQuery } from 'react-query'
import { useUser } from '../../../hooks/user'
import LikePostApi from '../services/LikePostApi'
import { useEffect, useMemo, useState } from 'react'
import { UserAccount } from '../../../components'
import { IoCaretDownCircleSharp } from 'react-icons/io5'
import { AiOutlineLike } from "react-icons/ai";
import { Button, Dialog, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
const emotions = ["👍", "❤️", "😂", "😭", "😡",]

export function LikePostDetail({ id, popup = true }) {
  const query = useQuery({
    queryKey: ['likeposts', id],
    queryFn: () => LikePostApi.get({ q: { post: id } }),
    initialData: []
  })
  const group = useMemo(() => Map.groupBy(query.data, ({ type }) => type), [query.data])
  const [open, setOpen] = useState()
  const [type, setType] = useState(emotions[0])

  return <div>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className={`fixed h-[400px] overflow-y-auto max-sm:h-screen max-sm:w-screen bg-surface text-onSurface rounded-lg overflow-hidden shadow top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-10`}>
        <div className="sticky z-1 top-0 flex justify-between gap-5 bg-primary p-2 ">
          {emotions.map(e => <button className={`p-2 text-xl ${e === type ? 'border-b-2 border-background' : ''} rounded-xs`} onClick={() => setType(e)} key={e}>{e}</button>)}
        </div>
        <div className="p-5 flex flex-col gap-3">
          {group.get(type)?.map(e => <div key={e.user} className="flex gap-10 justify-between items-center">
            <UserAccount id={e.user} />
            <div className="">{new Date(e.createdAt).toLocaleString('vi-VI')}</div>
          </div>)}
        </div>
      </div>
    </Dialog>
    <button onClick={() => setOpen(popup)} className="flex items-center gap-1">
      {[...group.keys()].slice(0, 3).map(e => <div key={e}>{e}</div>)}
      <div className='font-semibold text-sm'>{query.data.length ? query.data.length : "Chưa có lượt thích"}</div>
    </button>
  </div>
}

export function LikePost({ id }) {
  const { user } = useUser()
  const [like, setLike] = useState()

  useEffect(() => {
    LikePostApi.get({ q: { post: id, user: user._id } }).then(res => setLike(res[0]))
  }, [])

  const handleCreate = (type) => {
    setLike({ type })
    LikePostApi.create({ post: id, type })
  }

  const handleDelete = () => {
    setLike(null)
    LikePostApi.delete({ post: id })
  }

  return <div className="flex group relative">
    <div className={`hidden absolute ${like ? '' : 'group-hover:block'} bg-surface text-onSurface rounded-full shadow btn bottom-5 left-0 text-3xl`}>
      <div className="flex">{emotions.map(e => <div key={e} onClick={() => handleCreate(e)} className=" hover:-translate-y-1 transition-transform">{e}</div>)}</div>
    </div>
    {
      like ?
        <Button onClick={handleDelete} className="text-primary"><div className='text-sm font-semibold capitalize'>{like.type} Liked</div></Button> :
        <Button onClick={() => handleCreate(emotions[0])} startIcon={<AiOutlineLike />}><div className='text-sm font-semibold capitalize'>Like</div></Button>
    }
  </div>
}