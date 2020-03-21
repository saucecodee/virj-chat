const router = require("express").Router();
const {
  createGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
  getMembers
} = require("../controllers/GroupController");

module.exports = function () {
  router.post("/", createGroup);
  router.post("/join", joinGroup);
  router.post("/leave", leaveGroup);
  router.delete("/:groupId", deleteGroup);
  router.get("/:groupId/members", getMembers);

  return router;
};
