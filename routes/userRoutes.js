const router = require("express").Router();
const {
  signupUser,
  signinUser,
  getUsers,
  getUser,
  deleteUser,
  editUser,
} = require("../controllers/userController");
const { isUser } = require('../middlewares/auth')

module.exports = function () {
  router.post("/signup", signupUser);
  router.post("/signin", signinUser);
  router.get("/", getUsers);
  router.get("/:userId", getUser);
  router.put("/:userId", isUser, editUser);
  router.delete("/:userId", isUser, deleteUser);

  return router;
};
