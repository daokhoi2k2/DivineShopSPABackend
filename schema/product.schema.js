const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_url: {
    type: String,
    required: true,
    unique: true,
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
    type: Boolean,
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
  categoryId: {
    type: String,
    ref: "category"
  }
});

let Product = mongoose.model("product", productSchema, "product");

module.exports = Product;
