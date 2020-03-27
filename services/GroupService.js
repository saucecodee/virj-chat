const Group = require("../models/Group");
const CustomError = require("../helpers/CustomError");
const userService = require("./UserService");

class UsersService {

  constructor() {
    this.createUser = this.createUser.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.generateGroupCode = this.generateGroupCode.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  /**
   * 
   * @param {*} body body of the request
   * @description
   * Create user
   * generate group code
   * create group
   * save group
   * send response data
   */

  async createGroup(body) {
    let user = await this.createUser(body.username);

    let groupCode = await this.generateGroupCode();

    let group = new Group({
      creator: user._id,
      name: body.groupName,
      code: groupCode,
      members: [user._id]
    });

    let g = await group.save();

    const data = {
      userId: user._id,
      userName: user.username,
      groupId: g._id,
      groupName: g.name,
      code: g.code
    };

    return data
  }

  /**
   * 
   * @param {*} body body of the request
   * @description
   * check if group code exists
   * check if memeber name already exits in group
   * create user
   * add user to group to memebers array
   * 
   */

  async joinGroup(body) {
    const group = await Group.findOne({ code: body.code });

    if (!group) throw new CustomError("group dosen't exist", 404)

    let user = await this.createUser(body.username)

    group.members.push(user._id)

    let g = await group.save();

    const data = {
      userId: user._id,
      userName: user.username,
      groupId: g._id,
      groupName: g.name,
      code: g.code,
    };

    return data
  }

  /**
   * 
   * @param {*} body body of the request
   * @description
   * Check it user exists in memeber array
   * Remove user id from member array
   */

  async leaveGroup(body) {
    const group = await Group.findOne({ _id: body.groupId });
    let index = group.members.indexOf(body.userId)

    if (index > -1) group.members.splice(index, 1)

    await group.save();

    return null
  }

  /**
   * 
   * @param {*} groupId group Id to be deleted
   * @param {*} body body of the request
   * @description
   * Check if group exists
   * Check if userId is the creator
   * Delete group
   */

  async deleteGroup(groupId, body) {
    let group = await Group.findOne({ _id: groupId });

    if (group.creator != body.userId) throw new CustomError("unauthorized user", 405)

    let g = await Group.findOneAndRemove({ _id: groupId });

    if(!g) throw new CustomError("group not found", 404)
    
    return null
  }

  /**
   * 
   * @param {*} groupId group Id to be deleted
   * @description
   * Check if group exists
   * get the username of members
   */

  async getMembers(groupId) {
    const group = await Group.findOne({ _id: groupId });

    if (!group) throw new CustomError("group dosen't exist", 404)

    const groupMemebers = await userService.getGroupMembers(group.members)

    return groupMemebers
  }



  /**
   * 
   * @description
   * generate 6 digit code
   * check if code already exists
   */

  async generateGroupCode() {
    var chars = 'acdefhiklmnoqrstuvwxyz0123456789ABCDEFGHIJKLMNOP'.split('');
    var data = '';
    for (var i = 0; i < 6; i++) {
      var x = Math.floor(Math.random() * chars.length);
      data += chars[x];
    }

    return data;
  }

  async checkIfUserExist(userId) {
    const group = await Group.findOne({ _id: groupId });

    return group;
  }

  async createUser(username) {
    const user = await userService.createUser(username)
    return user;
  }

}
module.exports = new UsersService();
