import {Server} from 'socket.io'

const init = server => {        
    const io = new Server(server, {
        cors : {
            origin : process.env.CLIENT.split(','),            
        }
    })
    io.on('connection', (socket) => {
        socket.on('invalidate', keys => {
            io.emit('invalidate', keys)
        })
        socket.on('call', payload => {
            const t = JSON.parse(payload)
            if(t.type == 'join') socket.join(t.group)
            if(t.type == 'leave') socket.leave(t.group)
            socket.broadcast.to(t.group).emit('call', payload)
        })      
        socket.on('join', (group, cb) => {
            socket.join(group)
            if(cb) cb(io.sockets.adapter.rooms.get(group).size)
        })
        socket.leave('leave', group => {
            socket.leave(group)
        })
        socket.on('live', payload => {
            socket.broadcast.to(payload.group).emit('live', payload)
        })
    })
    return io   
}

export default init