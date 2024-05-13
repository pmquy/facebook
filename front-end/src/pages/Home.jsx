import { CreatePost, Posts } from '../features/post'
import { useContext } from 'react'
import CommonContext from '../store/CommonContext'

export default function () {
  const { user } = useContext(CommonContext)
  if (!user) return <></>
  return <div className='overflow-hidden'>
    <div className=' w-full max-w-[500px] xl:max-w-[700px] lg:m-auto max-md:m-auto flex flex-col gap-5'>
      <CreatePost />
      <Posts />
    </div>
  </div>
}