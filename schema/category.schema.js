const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);


let Category = mongoose.model("category", categorySchema, "category");

module.exports = Category;
