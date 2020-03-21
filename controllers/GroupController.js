const {
  createGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require("../services/GroupServices");

const { response } = require("../helpers/Messages");
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
}

module.exports = new GroupContoller();
