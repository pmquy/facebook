import { File } from '../components'
import { useParams} from 'react-router-dom'

export default function() {
  const params = useParams()
  return <div className='fixed h-screen overflow-auto top-0 left-0 z-50 bg-white dark:bg-black'>
    <File needToNavigate={true} detail={true} className={'w-screen'} id={params.id}/>
  </div>
}