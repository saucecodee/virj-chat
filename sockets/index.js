const {leaveGroup} = require("../services/GroupService")

module.exports = (server) => {

     const io = require('socket.io')(server);

     io.on('connection', (socket) => {
          socket.on('leave-village', (data) => {
               // let groupId = data.groupId

               //remove form group array
               socket.leave(socket.groupId);
               socket.to(socket.groupId).emit('movement', { user: socket.username, event: 'left' });
          });

          socket.on('join-village', (data) => {
               socket.username = data.username;
               socket.userId = data.userId;
               socket.groupId = data.groupId;

               socket.join(socket.groupId);
               socket.to(socket.groupId).emit('movement', { user: socket.username, event: 'joined' });
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
               socket.leave(socket.groupId);
               socket.to(socket.groupId).emit('movement', { user: socket.username, event: 'left' });
          })
     })
}