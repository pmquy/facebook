const {Server} = require('socket.io')

const init = app => {
    const server = require('http').createServer(app);
    const io = new Server(server, {
        cors : process.env.CLIENT
    })
    io.on('connection', (socket) => {        
        socket.on('invalidate', keys => {
            io.emit('invalidate', keys)
        })
    });
    server.listen(process.env.SOCKET_PORT || 3001);
}

module.exports = init