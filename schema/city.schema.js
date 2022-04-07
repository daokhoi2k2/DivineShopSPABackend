const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    matp: {
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
  },
);

let City = mongoose.model("city", citySchema, "city");

module.exports = City;
