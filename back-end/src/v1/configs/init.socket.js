import {Server} from 'socket.io'

const init = server => {        
    const io = new Server(server, {
        cors : {
            origin : process.env.CLIENT,            
        }
    })
    io.on('connection', (socket) => {        
        socket.on('invalidate', keys => {
            io.emit('invalidate', keys)
        })
        socket.on('call', payload => {
            const t = JSON.parse(payload)            
            if(t.type == 'join') socket.join(t.group)
            if(t.type == 'left') socket.leave(t.group)
            socket.broadcast.to(t.group).emit('call', payload)
        })       
    }); 
    return io   
}

export default init