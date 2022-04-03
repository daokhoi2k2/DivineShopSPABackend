const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: String,
    phoneNumber: String,
    vip: Number,
    balance: {
      type: Number,
      default: 0,
    },
    accumulated: {
      type: Number,
      default: 0,
    },
    citizenIdentificationNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
    sex: {
      type: Boolean,
    },
    city: {
      type: Number,
    },
    disctrict: {
      type: Number,
    },
    ward: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema, "user");
