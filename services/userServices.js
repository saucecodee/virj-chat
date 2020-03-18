const User = require("../models/user");
const CustomError = require("../helpers/CustomError");

class UserService {
  async createUser(data) {
    const user = new User(data);
    await user.save();
    return user;
  }

  async deleteUser(userId) {
    return await User.findOneAndRemove({ _id: userId });
  }
}
module.exports = new UserService();
