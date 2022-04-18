const orderModel = require("../model/order.model");
const userModel = require("../model/user.model");
module.exports = {
  getAllOrders: async (req, res) => {
    const response = await orderModel.getAllOrders();

    res.status(200).json(response);
  },
  // getProductsList: async (req, res) => {
  //   try {
  //     const { page, limit, ...filter } = req.query;
  //     const { category_id: categoryId, price_from: priceFrom, price_to: priceTo, sort } = filter;

  //     const skip = (page - 1) * limit;
  //     const filterQuery = {};
  //     categoryId && (filterQuery.categoryId = categoryId);
  //     priceFrom && (filterQuery.price_promotion = { $gte: priceFrom });
  //     priceTo && (filterQuery.price_promotion = { ...filterQuery.price_promotion, $lte: priceTo });

  //     sort &&
  //       (() => {
  //         switch (sort) {
  //           case "sales-desc":
  //             filterQuery.sort = { quantity_sold: -1 };
  //             break;
  //           case "date-desc":
  //             filterQuery.sort = { created_at: -1 };
  //             break;
  //           case "price-asc":
  //             filterQuery.sort = { price_promotion: 1 };
  //             break;
  //           case "price-desc":
  //             filterQuery.sort = { price_promotion: -1 };
  //             break;
  //           case "name-asc":
  //             filterQuery.sort = { name: 1 };
  //             break;
  //           case "name-desc":
  //             filterQuery.sort = { name: -1 };
  //             break;
  //           default:
  //             filterQuery.sort = {};
  //             break;
  //         }
  //       })();

  //     const response = await productModel.getProductsList(limit, skip, filterQuery);

  //     res.status(200).json(response);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).json(err);
  //   }
  // },
  // getProductByHashName: async (req, res) => {
  //   try {
  //     const hash_name = req.params.hash_name;
  //     const response = await productModel.getProductByHashName(hash_name);

  //     res.status(200).json(response);
  //   } catch (err) {
  //     res.status(400).json(err);
  //   }
  // },
  addOrder: async (req, res) => {
    try {
      const newOrder = req.body;
      // Check user money is enough ?
      // const isEnough = await userModel.

      const response = await orderModel.addOrder(newOrder);
      res.status(200).json(response);
    } catch (err) {
      console.log("Lỗi", err);
      res.status(400).json(err);
    }
    // res.status(200).json(response);
  },
  // deleteProduct: async (req, res) => {
  //   const _id = req.params._id;

  //   const response = await productModel.deleteProduct(_id);

  //   if (response) {
  //     return res.status(200).json(response);
  //   }

  //   return res.status(400).json("Have error in database");
  // },
  // updateProduct: async (req, res) => {
  //   const thumb_nail = req.file;
  //   const { _id, ...data } = req.body;

  //   try {
  //     if (thumb_nail) {
  //       const newProduct = {
  //         ...data,
  //         thumb_nail: thumb_nail?.filename || "",
  //       };
  //       const response = await productModel.updateProduct(_id, newProduct);
  //       return res.status(200).json(response);
  //     } else {
  //       const response = await productModel.updateProduct(_id, data);
  //       return res.status(200).json(response);
  //     }
  //   } catch (err) {
  //     if (err.codeName === "DuplicateKey") {
  //       return res.status(400).json({
  //         duplicateKeys: err.keyPattern,
  //       });
  //     }

  //     res.status(400).json(err);
  //   }
  // },
};
