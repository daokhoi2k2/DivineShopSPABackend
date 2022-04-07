const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  maqh: {
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
  matp: {
    type: String,
    required: true,
  },
});

let District = mongoose.model("district", districtSchema, "district");

module.exports = District;
