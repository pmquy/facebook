import Image from '../components/Image'
import {useNavigate, useParams} from 'react-router-dom'
import { FaChevronCircleLeft } from 'react-icons/fa'

export default function ImageDetail() {
  const params = useParams()
  const navigate = useNavigate()
  return <div className=' overflow-hidden'>
    <Image needToNavigate={false} className={'w-screen'} id={params.id}/>
    <FaChevronCircleLeft onClick={() => navigate(-1)} className="w-12 h-12 btn-teal fixed top-1/2 -translate-y-1/2 left-5" />
  </div>
}