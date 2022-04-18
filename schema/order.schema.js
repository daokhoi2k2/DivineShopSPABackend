const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    totals: {
      type: Array,
    },
    discount: {
      type: Number,
    },
    membership: {
      type: Number,
    },
    status: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
    },
    entries: {
      type: Array
    }
  },
  { timestamps: true }
);

let Order = mongoose.model("order", orderSchema, "order");

module.exports = Order;
