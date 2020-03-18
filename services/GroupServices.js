const Group = require("../models/user");
const CustomError = require("../helpers/CustomError");
const userService = require("../services/UserServices")

class UsersService {
  async createGroup(data) {
    const user = new Group(data);

    await user.save();

    return code;
  }

  async joinGroup() {
    //check if group code exists
    //check if memeber name already exits in group
    //add user to group to memebers array
    //emit joined
    return await Group.find({});
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

  async addGroupMemeber(username) {
    //check if user exist in memebers array
    //create user
    userService.createUser(username)
    //add user to the array
    //return usser

    const user = await Group.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
    });

    if (!user) throw new CustomError("user dosen't exist", 404);

    return user;
  }

}
module.exports = new UsersService();
