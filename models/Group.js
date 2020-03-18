const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users,
      required: [true, "field creator is required"]
    },
    name: {
      type: String,
      required: [true, "field name is required"]
    },
    code: {
      type: String,
      required: [true, "field code is required"]
    },
    memebers: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
      }]
    },
  },
  {
    timestamps: true
  });

module.exports = mongoose.model("Groups", GroupSchema);
