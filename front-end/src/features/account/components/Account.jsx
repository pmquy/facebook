import { useQueries } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { FilePreview } from '../../../components'
import api from '../services/api'

export default function ({ userId }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = useQueries([
    {
      queryKey: ['user', userId],
      queryFn: () => api.getById(userId),
    }
  ])
  if (query.some(e => e.isLoading || e.isError)) return <></>

  const user1 = query[0].data

  return <div className='card dark:card-black flex flex-col gap-5 pb-60 max-md:pb-72'>
    <div className="relative">
      <div className=" className={'w-screen h-[40vh] object-cover border-b-2 border-primary'} ">
        <FilePreview id={user1.avatar}/>
      </div>
      <div className='absolute w-max max-md:left-1/2 max-md:-translate-x-1/2 left-[10%] bottom-0 translate-y-3/4 flex flex-col gap-5'>
        <div className='flex max-md:flex-col gap-5 items-center'>
          <div className={'w-60 h-60 border-primary border-2 overflow-hidden rounded-full'} >
            <FilePreview id={user1.avatar}/>
          </div>
          <div className="">
            <div className='text-3xl font-semibold text-primary'>{user1.firstName + ' ' + user1.lastName}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { searchParams.set('q', 'post'); setSearchParams(searchParams) }} className={`${searchParams.get('q') === 'post' ? 'border-b-2 border-primary ' : ''} font-medium p-2`}>Bài viết</button>
          <button onClick={() => { searchParams.set('q', 'info'); setSearchParams(searchParams) }} className={`${searchParams.get('q') === 'info' ? 'border-b-2 border-primary ' : ''} font-medium p-2`}>Giới thiệu</button>
          <button onClick={() => { searchParams.set('q', 'friend'); setSearchParams(searchParams) }} className={`${searchParams.get('q') === 'friend' ? 'border-b-2 border-primary ' : ''} font-medium p-2`}>Bạn bè</button>
          <button onClick={() => { searchParams.set('q', 'image'); setSearchParams(searchParams) }} className={`${searchParams.get('q') === 'image' ? 'border-b-2 border-primary ' : ''} font-medium p-2`}>Ảnh</button>
        </div>
      </div>
    </div>
  </div>
}