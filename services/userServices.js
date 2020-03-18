const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const CustomError = require("../helpers/CustomError");

class UsersService {
  async signupUser(data) {
    if (await User.findOne({ email: data.email }))
      throw new CustomError("email already exists");
    if (await User.findOne({ phone: data.phone }))
      throw new CustomError("phone number already exists");

    const user = new User(data);

    const token = await jwt.sign({ id: user._id, role: "user" }, "healthie");

    await user.save();

    return token;
  }

  async signinUser(data) {
    if (!data.email) throw new CustomError("No email specified");
    if (!data.password) throw new CustomError("No password");

    const user = await User.findOne({ email: data.email });

    if (!user) throw new CustomError("Incorrect email");

    const isCorrect = await bcrypt.compare(data.password, user.password)

    if (!isCorrect) throw new CustomError("Incorrect email or password");

    const token = await jwt.sign({ id: user._id, role: "user" }, "healthie");

    return { token, user };
  }

  async getUsers() {
    return await User.find({});
  }

  async getUser(userId) {
    const user = await User.findOne({ _id: userId });

    return user;
  }

  async editUser(userId, data) {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      new: true,
    });

    if (!user) throw new CustomError("user dosen't exist", 404);

    return user;
  }

  async deleteUser(userId) {
    return await User.findOneAndRemove({ _id: userId });
  }
}
module.exports = new UsersService();
