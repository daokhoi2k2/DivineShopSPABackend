const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const users = await userModel.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  changeAvatar: async (req, res) => {
    try {
      const avatar = req.file;
      const _id = req.user._id;

      const response = await userModel.findAndupdateById(_id, {
        avatar: avatar.filename,
      });

      res.status(200).json(response);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();

      const hashed = await bcrypt.hash(req.body.password, salt);
      // Create new user
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      };

      await userModel.createUser(newUser);

      res.status(200).json({
        msg: "created successfully",
        // accountInfo:
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserById: (req, res) => {
    const id = req.params.id;

    res.status(200).json(id);
  },
  deleteUserById: async (req, res) => {
    try {
      const id = req.params.id;
      await userModel.deleteUserById(id);

      res.status(200).json(id);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const response = await userModel.findAndupdateById(id, data);

      res.status(200).json(response);
    } catch (err) {}
  },
};
