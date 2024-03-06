const {Server} = require('socket.io')

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
            if(payload.type == 'join') socket.join(payload.group)
            if(payload.type == 'left') socket.leave(payload.group)
            socket.broadcast.to(payload.group).emit('call', payload)
        })       
    }); 
    return io   
}

module.exports = init