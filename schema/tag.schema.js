const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    tag_name: {
      type: String,
      require: true,
      unique: true,
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


let Tag = mongoose.model("tag", tagSchema, "tag");

module.exports = Tag;
