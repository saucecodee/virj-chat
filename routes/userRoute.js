const router = require("express").Router();
const {
  signupUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");

module.exports = function () {
  router.post("/", signupUser);
  router.get("/:userId", getUser);
  router.delete("/:userId", deleteUser);

  return router;
};
