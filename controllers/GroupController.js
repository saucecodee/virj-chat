const {
  createGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require("../services/groupservices");

const { response } = require("../helpers/messages");
const CustomError = require('../helpers/CustomError')

class GroupContoller {
  async createGroup(req, res) {
    const token = await createGroup(req.body);
    res.status(201).send(response("user created", token));
  }

  async joinGroup(req, res) {
    const token = await joinGroup(req.body);
    res.status(200).send(response("user joined", token));
  }

  async leaveGroup(req, res) {
    const token = await leaveGroup(req.body);
    res.status(200).send(response("user left", token));
  }

  async deleteGroup(req, res) {
    const group = await deleteGroup(req.params.groupId);
    res.status(200).send(response("group deleted", group));
  }
}

module.exports = new GroupContoller();
