const {
  createGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
  getMembers
} = require("../services/GroupService");

const { response } = require("../helpers/Message");
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
    const data = await leaveGroup(req.params.groupId);
    res.status(200).send(response("group left", data));
  }
  
  async deleteGroup(req, res) {
    const data = await deleteGroup(req.params.groupId, req.body);
    res.status(200).send(response("group deleted", data));
  }

  async getMembers(req, res) {
    const data = await getMembers(req.params.groupId);
    res.status(200).send(response("group members", data));
  }
}

module.exports = new GroupContoller();
