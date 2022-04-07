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
    membership: {
      type: Number,
      default: 0
    },
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
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    ward: {
      type: String,
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
