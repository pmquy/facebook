import {io} from 'socket.io-client'
const socket = new io(import.meta.env.VITE_SERVER_URL)
export default socket