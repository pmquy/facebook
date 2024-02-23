import {useQuery} from 'react-query'
import GameApi from '../services/api'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import CommonContext from '../../../store/CommonContext'

const variants = [
  'after:absolute after:w-9 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600 after:rotate-90',
  'after:absolute after:w-9 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600',
  'after:absolute after:w-14 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600 after:rotate-45',
  'after:absolute after:w-14 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600 after:-rotate-45',
]

export default function ({id}) {
  const {socket} = useContext(CommonContext)
  const query = useQuery({
    queryKey : ['carogame', id],
    queryFn : () => GameApi.getById(id)
  })
  
  if(query.isError || query.isLoading) return <></>

  const handleUpdate = (i,j) => {
    GameApi.updateById(id, {
      i : i,
      j : j
    })
      .then(() => socket.emit('invalidate', ['carogame', id]))
      .catch(err => toast(err.message, {type : 'error'}))
  }  
  console.log(query.data)

  return <div className='card_1 m-auto p-5 w-max'>
    <div className='flex flex-col'>
      {query.data.content.map((e, i) => <div className='flex'>
        {e.map((t, j) => <div onClick={() => {if(!t) handleUpdate(i, j)}} className={`bg-white_0 w-9 h-9 border-2 ${!t ? 'hover:bg-white_2' : ''}  text-xl text-center ${t == 'x' ? 'text-blue-600 after:bg-blue-600' : 'text-red-600 after:bg-red-600'} relative ${query.data.result.length && variants[Number.parseInt(query.data.result[i][j])]}`}>{t}</div>)}
      </div>)}
    </div>
  </div>
}