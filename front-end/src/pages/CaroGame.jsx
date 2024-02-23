import {useParams} from 'react-router-dom'
import {Game} from '../features/caro'

export default function () {
  const params = useParams()
  return <div>
    <Game id={params.id}/>
  </div>
}