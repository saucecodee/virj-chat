const router = require("express").Router();
const userRoutes = require("./userRoute");

module.exports = function (server) {
  const io = require('socket.io')(server);


  router.get("/test", (req, res) => {
    res.send("yehh!==========================");
  });
  router.use("/groups", groupsRoutes());


  io.on('connection', (socket) => {

    socket.on('user-left', () => {
      io.emit('movement', { user: socket.name, event: 'left' });
    });

    socket.on('user-created', (user) => {
      socket.name = user.name;
      socket.userId = user.id
      io.emit('movement', { user: socket.name, event: 'joined' });
    });

    socket.on('send-message', (message) => {
      io.emit('message', {
        msg: message.text,
        user: socket.name,
        userId: socket.userId,
        sentAt: new Date()
      });
    });

  });

  return router;
};
