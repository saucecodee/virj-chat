const router = require("express").Router();
const {
  createGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require("../controllers/GroupController");

module.exports = function () {
  router.post("/", createGroup);
  router.post("/:groupId/join", joinGroup);
  router.post("/:groupId/leave", leaveGroup);
  router.delete("/:groupId", deleteGroup);

  return router;
};
