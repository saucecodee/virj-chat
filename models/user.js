const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "field name is required"]
    }
  });

module.exports = mongoose.model("Users", UserSchema);
