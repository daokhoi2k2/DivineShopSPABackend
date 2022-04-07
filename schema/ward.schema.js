const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    xaid: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      required: true,
    },
    maqh: {
      type: String,
      required: true
    }
  },
);

let Ward = mongoose.model("ward", wardSchema, "ward");

module.exports = Ward;
