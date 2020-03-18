const jwt = require("jsonwebtoken");
const User = require("../models/user");
const CustomError = require("../helpers/CustomError");

async function isUser(req, res, next) {
  const decoded = await jwt.verify(req.headers.authtoken, "healthie");

  const user = await User.findOne({ _id: decoded.id });

  if (!user) throw new CustomError("User dosen't exist");

  if (decoded.role == "user") {
    req.headers.user = decoded;
    next();
  } else {
    throw new CustomError("Unauthorized user", 401);
  }
}

module.exports.isDoctor = isDoctor;
module.exports.isUser = isUser;
