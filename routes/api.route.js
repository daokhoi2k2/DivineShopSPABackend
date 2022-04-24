const router = require("express").Router();
const multer = require("multer");
const thumbnailUpload = multer({ dest: "uploads/images/thumb_nails" });
const avatarUpload = multer({ dest: "uploads/images/avatars" });

const controller = require("../controller/api.controller");
const userController = require("../controller/user.controller");
const categoryController = require("../controller/category.controller");
const productController = require("../controller/product.controller");
const locationController = require("../controller/location.controller");
const orderController = require("../controller/order.controller");
const tagController = require("../controller/tag.controller");
const middlewareController = require("../controller/middleware.controller");

router.get("/", controller.index);

// Product
router
  .get("/product", middlewareController.verifyTokenAndAdminAuth, productController.getAllProducts)
  .get("/product/list", productController.getProductsList)
  .get("/product/autocomplete", productController.getListAutoComplete)
  .post(
    "/product",
    middlewareController.verifyTokenAndAdminAuth,
    thumbnailUpload.single("thumb_nail"),
    productController.addProduct
  )
  .put(
    "/product",
    middlewareController.verifyTokenAndAdminAuth,
    thumbnailUpload.single("thumb_nail"),
    productController.updateProduct
  )
  .get("/product/hash_name/:hash_name", productController.getProductByHashName)
  .delete("/product/:_id", productController.deleteProduct);

// Category
router.get("/category", categoryController.getAllCategories);

// User
router
  .post("/user/register", userController.register)
  .get("/user/order", middlewareController.verifyToken, orderController.getOrderUser)
  .post(
    "/user/avatar",
    middlewareController.verifyToken,
    avatarUpload.single("avatar"),
    userController.changeAvatar
  )
  .post("/user/:id", userController.updateUserById)
  .get("/user", middlewareController.verifyTokenAndAdminAuth, userController.getAllUser)
  .get("/user/:id", userController.getUserById)
  .delete("/user/:id", userController.deleteUserById);

// Location
router
  .get("/location", middlewareController.verifyToken, locationController.city)
  .get("/location/:city", middlewareController.verifyToken, locationController.district)
  .get("/location/ward/:district", middlewareController.verifyToken, locationController.ward);

// Order
router
  .get("/order", orderController.getAllOrders)
  .get("/order/:id", orderController.getOrderById)
  .post("/order", orderController.addOrder);

// Tag
router
  .get("/tag", tagController.getAllTags)
  .post("/tag", middlewareController.verifyTokenAndAdminAuth, tagController.addTag)
  .patch("/tag", middlewareController.verifyTokenAndAdminAuth, tagController.updateTag);

module.exports = router;
