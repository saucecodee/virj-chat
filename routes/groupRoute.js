const router = require("express").Router();
const {
  createGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require("../controllers/GroupController");

module.exports = function () {
  router.post("/", createGroup);
  router.post("/:GroupId/join", joinGroup);
  router.post("/:GroupId/leave", leaveGroup);
  router.delete("/:GroupId", deleteGroup);

  return router;
};
