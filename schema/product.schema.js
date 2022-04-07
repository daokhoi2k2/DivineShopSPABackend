const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  price_promotion: {
    type: Number,
    default: 0,
  },
  status: {
    tpye: Number,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  thumb_nail: {
    type: String,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
});

let District = mongoose.model("product", productSchema, "product");

module.exports = District;
