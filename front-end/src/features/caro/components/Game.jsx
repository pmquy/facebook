import {useQuery} from 'react-query'
import GameApi from '../services/api'
import { toast } from 'react-toastify'
import { useUser } from '../../../hooks/user'

const variants = [
  'after:absolute after:w-9 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600 after:rotate-90',
  'after:absolute after:w-9 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600',
  'after:absolute after:w-14 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600 after:rotate-45',
  'after:absolute after:w-14 after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:h-[1px] after:bg-blue-600 after:-rotate-45',
]

export default function ({id}) {  
  const {user} = useUser()
  const query = useQuery({
    queryKey : ['carogame', id],
    queryFn : () => GameApi.getById(id)
  }) 
  
  if(query.isError || query.isLoading) return <></>

  const handleUpdate = (i,j) => {
    GameApi.updateById(id, {i : i,j : j})      
      .catch(err => toast(err.message, {type : 'error'}))
  }
  
  const game = query.data  

  return <div className=''>
    <div className='flex flex-col items-start'>
      {game.content.map((e, i) => <div className='flex'>
        {e.map((t, j) => <div onClick={() => {if(!t) handleUpdate(i, j)}} className={`bg-white_0 group w-9 h-9 border-[1px] text-xl text-center ${t == 'x' ? 'text-blue-600 after:bg-blue-600' : 'text-red-600 after:bg-red-600'} relative ${game.result.length && variants[Number.parseInt(game.result[i][j])]}`}>{t}
          {!game.result.length && !t && game.turn == user._id && <div className={`hidden w-9 h-9 bg-white_2 group-hover:block ${game.from == user._id ? ' text-blue-600' : 'text-red-600'}`}>{game.from == user._id ? 'x' : 'o'}</div>}
        </div>)}
      </div>)}
    </div>
  </div>
}