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
    const data = await createGroup(req.body);
    res.status(201).send(response("group created", data));
  }

  async joinGroup(req, res) {
    const data = await joinGroup(req.body);
    res.status(200).send(response("group joined", data));
  }

  async leaveGroup(req, res) {
    const dat = await leaveGroup(req.body);
    res.status(200).send(response("group left", dat));
  }

  async deleteGroup(req, res) {
    const group = await deleteGroup(req.params.groupId);
    res.status(200).send(response("group deleted", group));
  }
}

module.exports = new GroupContoller();
