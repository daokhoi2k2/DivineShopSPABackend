const router = require("express").Router();
const controller = require("../controller/api.controller");
const userController = require("../controller/user.controller");
const categoryController = require("../controller/category.controller");
const productController = require("../controller/product.controller");
const middlewareController = require("../controller/middleware.controller")

router.get("/", controller.index)

// Product
router
    .get("/product", productController.getAllProducts)

// Category
router
    .get("/category", categoryController.getAllCategories)
    
// User
router
    .get("/user", middlewareController.verifyTokenAndAdminAuth, userController.getAllUser)
    .get("/user/:id", userController.getUserById)
    .delete("/user/:id", userController.deleteUserById)



module.exports = router;