import { useQueryClient } from 'react-query'
import {io} from 'socket.io-client'

const useSocket = () => {
  const queryClient = useQueryClient()
  const socket = new io(import.meta.env.VITE_SERVER_URL)  
  const chain = Promise.resolve()
  const listener = keys => chain.then(() => queryClient.invalidateQueries(keys))
  socket.on('invalidate',listener)  
  return socket
}

export default useSocket