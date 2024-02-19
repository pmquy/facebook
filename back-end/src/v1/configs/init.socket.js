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
    });    
}

module.exports = init