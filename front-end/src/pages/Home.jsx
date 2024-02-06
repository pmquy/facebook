import { MdAccountCircle } from 'react-icons/md'
import LeftBar from '../layouts/LeftBar'
import RightBar from '../layouts/RightBar'

export default function () {
  return <div className='overflow-hidden'>
    <LeftBar className={' max-lg:hidden'}/>
    <RightBar className={'max-md:hidden'}/>
    <div className=' w-full max-w-[500px] xl:max-w-[700px] lg:m-auto max-md:m-auto flex flex-col gap-5'>
      <div className='flex gap-5 items-center p-5 bg-white_0 box-shadow rounded-lg'>
        <MdAccountCircle className='w-8 h-8'/>
        <div className=' bg-white_1 p-2 rounded-xl flex-grow hover:bg-white_2'>Bạn đang nghĩ gì thế</div>
      </div>
      <div className=' text-6xl'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cumque quam, quae quos, sequi obcaecati aspernatur voluptatibus magni unde aliquid facere in minus! Ipsam amet laborum repudiandae tempore, quia porro? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, maiores labore. Voluptas, odit pariatur. Culpa, blanditiis sapiente provident quidem vero expedita modi, facilis atque, ratione ipsum soluta accusamus maiores eligendi?</div>
    </div>
  </div>
}