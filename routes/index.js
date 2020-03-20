const router = require("express").Router();
const groupRoute = require("./groupRoute");

module.exports = function (server) {
  const io = require('socket.io')(server);


  router.get("/test", (req, res) => {
    res.send("yehh!==========================");
  });



  
  router.use("/groups", groupRoute());


  io.on('connection', (socket) => {

    socket.on('leave', (data) => {
      let groupId = data.groupId

      socket.leave(groupId);
      io.to(groupId).emit('movement', { user: socket.username, event: 'left' });
    });

    socket.on('join', (data) => {
      socket.name = data.username;
      socket.userId = data.userId;
      let groupId = data.groupId
      
      socket.join(groupId);
      io.to(groupId).emit('movement', { user: socket.username, event: 'joined' });
    });
    
    socket.on('send-message', (data) => {
      let groupId = data.groupId

      io.to(groupId).emit('message', {
        message: data.message,
        user: socket.username,
        userId: socket.userId,
        sentAt: new Date()
      });
    });

  });

  return router;
};
