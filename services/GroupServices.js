const Group = require("../models/Group");
const CustomError = require("../helpers/CustomError");
const userService = require("../services/UserServices");

class UsersService {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.generateGroupCode = this.generateGroupCode.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  async createGroup(data) {
    //create user
    let user = await this.createUser(data.username)

    //get group code
    let groupCode = await this.generateGroupCode()

    //create group
    const group = new Group({
      creator: user._id,
      name: data.groupName,
      code: groupCode,
      members: [user._id]
    });

    let g = await group.save();
    
    const res = {
      userId: user._id,
      groupId: g._id,
      creator: g.creator,
      code: g.code
    };

    console.log(res);
    
    return res
  }

  async joinGroup(data) {
    //check if group code exists
    const group = await Group.findOne({ code: data.code });

    if (!group) throw new CustomError("group dosen't exist", 404)
    
    //check if memeber name already exits in group
    
    //create user
    let user = await this.createUser(data.username)

    //add user to group to memebers array
    group.members.push(user._id)

    let g = await group.save();

    const res = {
      userId: user._id,
      groupId: g._id,
      code: g.code,
    };

    return res 
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
    var chars = 'acdefhiklmnoqrstuvwxyz0123456789ABCDEFGHIJKLMNOP'.split('');
    var result = '';
    for (var i = 0; i < 6; i++) {
      var x = Math.floor(Math.random() * chars.length);
      result += chars[x];
    } 
    //check if code exhist else generate again
    return result;
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
    const user = await userService.createUser(username)
    return user;
  }

}
module.exports = new UsersService();
