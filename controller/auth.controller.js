const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30m" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "1d" }
    );
  },

  // Login
  loginUser: async (req, res) => {
    try {
      const user = await userModel.findUserByEmailOrUsername(req.body.account);

      // Check user is exist
      if (!user)
        return res.status(404).json({
          msg: "User not found",
        });

      // Check password hashed
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          msg: "Wrong password",
        });
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          // httpOnly: true, // không thể dùng document.cookie
          // path: "/",
          sameSite: "None",
          secure: false, // cookie chỉ được gửi qua https
        });
        
        // Remove password inside the user object
        const { password, ...userInfo } = user._doc;
        return res.status(200).json({ userInfo, accessToken });
      }

      return res.status(404).json({
        msg: "Not have this case in logic",
      });
    } catch (err) {
      console.log("Lỗi", err);
      res.status(500).json(err);
    }
  },

  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json("You're not authenticated");

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(500).json(err);
      }
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);

      res.cookie("refreshToken", newRefreshToken, {
        // httpOnly: true, // không thể dùng document.cookie
        // path: "/",
        sameSite: "None", // lỗi khi upload vì ở 2 site khác nhau
        secure: true, // cookie chỉ được gửi qua https
      });

      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logout: (req, res) => {
    // Thường ta sẽ lưu refreshToken ở 1 database và sẽ blacklist nó khi
    // logout để tránh người ta lấy refreshToken đó đăng nhập khi đăng xuất
    res.clearCookie("refreshToken");
    // res.clearCookie("accessToken");
    res.status(200).json("Logged out !");
  },

  getCurrentUserInfo: async (req, res) => {
    const result = await userModel.findUserById(req.user._id);
    const { password, ...userInfo} = result._doc;
    res.status(200).json(userInfo)
  }
};

module.exports = authController;
