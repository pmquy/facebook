import { createContext, useContext, useEffect, useState } from "react"
import { io } from 'socket.io-client'
import { useQueryClient } from 'react-query'

const SocketContext = createContext()

export function SocketProvider({ children }) {
  const queryClient = useQueryClient()
  const [socket, setSocket] = useState()

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL)

    const listener = (keys) => {
      queryClient.invalidateQueries(keys)
    }

    socket.on('invalidate', listener)

    setSocket(socket)

    return () => {
      socket.off('invalidate', listener)
      socket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within a SocketProvider')
  return context
}