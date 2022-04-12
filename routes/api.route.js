const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const controller = require("../controller/api.controller");
const userController = require("../controller/user.controller");
const categoryController = require("../controller/category.controller");
const productController = require("../controller/product.controller");
const locationController = require("../controller/location.controller");
const middlewareController = require("../controller/middleware.controller");

router.get("/", controller.index);

// Product
router
  .get("/product", productController.getAllProducts)
  .post(
    "/product",
    middlewareController.verifyTokenAndAdminAuth,
    upload.single("thumb_nail"),
    productController.addProduct
  )
  .put(
    "/product",
    // middlewareController.verifyTokenAndAdminAuth,
    upload.single("thumb_nail"),
    productController.updateProduct
  )
  .delete("/product/:_id", productController.deleteProduct)

// Category
router.get("/category", categoryController.getAllCategories);

// User
router
  .post("/user/register", userController.register)
  .post("/user/:id", userController.updateUserById)
  .get("/user", middlewareController.verifyTokenAndAdminAuth, userController.getAllUser)
  .get("/user/:id", userController.getUserById)
  .delete("/user/:id", userController.deleteUserById);

router
  .get("/location", middlewareController.verifyToken, locationController.city)
  .get("/location/:city", middlewareController.verifyToken, locationController.district)
  .get("/location/ward/:district", middlewareController.verifyToken, locationController.ward);

module.exports = router;
