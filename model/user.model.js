const User = require("../schema/user.schema");

module.exports = {
  getAllUsers: () => {
    return User.find();
  },
  createUser: (newUser) => {
    return User.create(newUser);
  },
  getMemberShipUserByEmail: (email) => {
    return User.findOne(
      { email },
      {
        membership: 1,
        email: 1,
        username: 1,
        balance: 1,
      }
    );
  },
  findUserByEmailOrUsername: (info) => {
    return User.findOne({ $or: [{ username: info }, { email: info }] });
  },
  findUserById: (id) => {
    return User.findOne({ _id: id });
  },
  deleteUserById: (id) => {
    return User.findByIdAndDelete(id);
  },
  findAndupdateById: (id, data) => {
    return User.findByIdAndUpdate(id, data);
  },
  deductMoney: (id, remainingBalance) => {
    return User.updateOne(
      { _id: id },
      {
        balance: remainingBalance,
      }
    );
  },
};
