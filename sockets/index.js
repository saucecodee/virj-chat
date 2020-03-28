
module.exports = (server) => {
     const io = require('socket.io')(server);
     io.on('connection', (socket) => {
          socket.on('leave-village', (data) => {
               let groupId = data.groupId

               //remove form group array
               socket.leave(groupId);
               socket.to(groupId).emit('movement', { user: socket.username, event: 'left' });
          });

          socket.on('join-village', (data) => {
               socket.username = data.username;
               socket.userId = data.userId;
               let groupId = data.groupId

               socket.join(groupId);
               socket.to(groupId).emit('movement', { user: socket.username, event: 'joined' });
          });

          socket.on('send-message', (data) => {
               let groupId = data.groupId

               socket.to(groupId).emit('new-message', {
                    message: data.message,
                    user: socket.username,
                    userId: socket.userId,
                    sentAt: data.date
               });
          });

          socket.on('disconnect', () => {
               console.log("left  =============================++++++")
               //     socket.broadcast.emit('user-disconnected', users[socket.id])
               //     delete users[socket.id]
          })
     })
}