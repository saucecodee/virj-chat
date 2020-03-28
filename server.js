require('express-async-errors')
const CustomError = require("./helpers/CustomError");
const path = require("path")
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const middlewares = require('./middlewares');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const sockets = require("./sockets")

const databaseConfig = require('./config/db');
const port = process.env.PORT || 3030;

middlewares(app);

sockets(server)

app.use('/api', routes(server))

app.use('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/index.html"));
})

app.use((req, res, next) => {
  throw new CustomError("Invalid request", 400);
});

app.use(errorHandler);

server.listen(port, () => {
  console.log("::: server listening on port " + port + ". Open in your browser http://localhost:" + port + "/");
  databaseConfig();
});

server.on('error', (error) => {
  console.log("::> an error occiurred in our server " + error);
});
