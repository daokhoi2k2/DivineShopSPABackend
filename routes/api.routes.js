const express = require("express");
const controller = require("../controller/api.controller");
const router = express.Router();

router.get("/", controller.index)

// Product
router
    .get("/product", controller.getAllProducts)


// Category
router
    .get("/category", controller.getAllCategories)

module.exports = router;