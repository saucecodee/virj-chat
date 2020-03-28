const router = require("express").Router();
const groupRoute = require("./groupRoute");

module.exports = function () {
  router.use("/groups", groupRoute());

  return router;
};
