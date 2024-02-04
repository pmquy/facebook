const init = app => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);
    io.on('connection', () => {
        console.log('Someone connect')
    });
    server.listen(process.env.SOCKET_PORT || 3001);
}

module.exports = init