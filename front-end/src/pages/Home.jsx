import LeftBar from '../layouts/LeftBar'
import RightBar from '../layouts/RightBar'
import {CreatePost, Posts} from '../features/post'

export default function () {
  return <div className='overflow-hidden'>
    <LeftBar className={' max-lg:hidden'}/>
    <RightBar className={'max-md:hidden'}/>
    <div className=' w-full max-w-[500px] xl:max-w-[700px] lg:m-auto max-md:m-auto flex flex-col gap-5 my-5'>            
      <CreatePost/>
      <Posts/>
    </div>
  </div>
}