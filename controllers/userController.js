const {
  signupUser,
  signinUser,
  getUsers,
  getUser,
  deleteUser,
  editUser,
} = require("../services/userServices");

const { response } = require("../helpers/messages");
const CustomError = require('../helpers/CustomError')

class UserContoller {
  async signupUser(req, res) {
    const token = await signupUser(req.body);
    res.status(201).send(response("user created", token));
  }

  async signinUser(req, res) {
    const token = await signinUser(req.body);
    res.status(200).send(response("user signed in", token));
  }

  async getUsers(req, res) {
    const users = await getUsers();
    res.status(200).send(response("all users", users));
  }

  async getUser(req, res) {
    const user = await getUser(req.params.userId);
    res.status(200).send(response("user data", user));
  }

  async editUser(req, res) {
    const user = await editUser(req.params.userId, req.body);
    if (req.params.userId != req.headers.user.id) throw new CustomError("Invalid user", 401)
    res.status(200).send(response("user edited", user));
  }

  async deleteUser(req, res) {
    const user = await deleteUser(req.params.userId);
    res.status(200).send(response("user deleted", user));
  }
}

module.exports = new UserContoller();
