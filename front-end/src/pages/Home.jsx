import { MdAccountCircle } from 'react-icons/md'
import LeftBar from '../layouts/LeftBar'
import RightBar from '../layouts/RightBar'

export default function () {
  return <div>
    <LeftBar className={' max-lg:hidden'}/>
    <RightBar className={'max-md:hidden'}/>
    <div className=' w-full max-w-[500px] lg:max-w-[600px] lg:m-auto max-md:m-auto flex flex-col gap-5'>
      <div className='flex gap-5 items-center p-5 bg-white_1 rounded-lg'>
        <MdAccountCircle className='w-8 h-8'/>
        <div className=' bg-white_2 p-2 rounded-xl flex-grow hover:bg-white_0'>Bạn đang nghĩ gì thế</div>
      </div>
    </div>
  </div>
}