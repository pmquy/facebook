import {io} from 'socket.io-client'
const socket = new io(import.meta.env.VITE_SOCKET_URL)
export default socket