const router = require("express").Router();
const controller = require("../controller/auth.controller");
const middlewareController = require("../controller/middleware.controller");

router.get("/", (req, res) => {
    res.send("Auth route");
})

router
    .post("/register", controller.register)
    .post("/login", controller.loginUser)
    .post("/refresh", controller.refreshToken)
    .post("/logout", middlewareController.verifyToken, controller.logout)
    .post("/getCurrentUserInfo", middlewareController.verifyToken, controller.getCurrentUserInfo)

module.exports = router;