module.exports.controller = function (app) {
  
    var socketio = app.io
    // Creating socket listeners
// socket.io events
socketio.on("connection", function (socket) {

    // Repeated ugly code. Refactor later.
    socket.on('disconnect', function () {
        var connectedUsers = 0
        var connectedDevices = []
        for (var element in socketio.sockets.connected) {
            connectedUsers++
            connectedDevices.push(socketio.sockets.connected[element].handshake.headers['user-agent'])
        }

        socketio.sockets.emit('stats', {
            connected_users: connectedUsers,
            connected_devices: connectedDevices
        });

    });

    var connectedUsers = 0
    var connectedDevices = []
    for (var element in socketio.sockets.connected) {
        connectedUsers++
        connectedDevices.push(socketio.sockets.connected[element].handshake.headers['user-agent'])
    }

    socketio.sockets.emit('stats', {
        connected_users: connectedUsers,
        connected_devices: connectedDevices
    });
});

}