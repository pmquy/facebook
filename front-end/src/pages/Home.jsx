import { CreatePost, Posts } from '../features/post'

export default function () {
  return <div className='overflow-hidden'>
    <div className=' w-[90%] m-auto max-w-[700px] max-sm:w-screen flex flex-col gap-5'>
      <CreatePost />
      <Posts />
    </div>
  </div>
}