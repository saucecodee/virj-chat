const Group = require("../models/user");
const CustomError = require("../helpers/CustomError");
const userService = require("../services/UserServices")

class UsersService {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }
  
  async createGroup(data) {
    console.log(data, "=================================")

    //create user
    let user = this.createUser(data.username)

    //create group
    let groupCode = this.generateGroupCode()
    const group = new Group({
      creator: user._id,
      name: data.name,
      code: groupCode,
      memebers: [user._id]
    });

    await group.save();

    return {
      groupId: _id,
      creator: group.creator,
      code: group.code
    };
  }

  async joinGroup(data) {
    //check if group code exists
    let user = this.createUser(data.username)

    //check if memeber name already exits in group
    const group = await Group.findOne({ code: data.code });

    //add user to group to memebers array
    group.memebers.push(user._id)
    await group.save();
    return {
      groupId: _id,
      code: group.code
    };
  }

  async leaveGroup() {
    //check if user exist in members array
    //remove id from array of memebers
    //
    return await Group.find({});
  }

  async deleteGroup(groupId) {
    return await Group.findOneAndRemove({ _id: groupId });
  }



  async generateGroupCode(userId) {
    //generate 6 code
    //check if code exhist else generate again
    return code;
  }


  async checkIfUserExist(userId) {
    const group = await Group.findOne({ _id: groupId });

    return group;
  }

  async getGroup(groupId) {
    const group = await Group.findOne({ _id: groupId });

    return group;
  }

  async createUser(username) {
    const user = useruserService.createUser(username)
    return user;
  }

}
module.exports = new UsersService();
