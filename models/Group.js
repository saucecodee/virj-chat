const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true
  });

module.exports = mongoose.model("Groups", GroupSchema);
