const router = require("express").Router();
const userRoutes = require("./userRoutes");

module.exports = function (server) {
  router.get("/test", (req, res) => {
    res.send("yehh!");
  });
  router.use("/users", userRoutes());

  const io = require('socket.io')(server);

  io.on('connection', (socket) => {

    socket.on('user-left', () => {
      io.emit('movement', { user: socket.username, event: 'left' });
    });

    socket.on('user-created', (name) => {
      io.emit('movement', { user: socket.username, event: 'joined' });
    });

    socket.on('send-message', (message) => {
      io.emit('message', { msg: message.text, user: socket.username, sentAt: new Date() });
    });
  });

  return router;
};
