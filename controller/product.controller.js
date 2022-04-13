const productModel = require("../model/product.model");
module.exports = {
  getAllProducts: async (req, res) => {
    const response = await productModel.getAllProducts();

    res.status(200).json(response);
  },
  getProductsList: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const skip = (page - 1) * limit;
      const response = await productModel.getProductsList(limit, skip);

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getProductByHashName: async (req, res) => {
    try {
      const hash_name = req.params.hash_name;
      const response = await productModel.getProductByHashName(hash_name);

      res.status(200).json(response);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  addProduct: async (req, res) => {
    const thumb_nail = req.file;
    const newProduct = {
      ...req.body,
      thumb_nail: thumb_nail?.filename || "",
    };

    const response = await productModel.addProduct(newProduct);

    res.status(200).json(response);
  },
  deleteProduct: async (req, res) => {
    const _id = req.params._id;
    console.log(_id);

    const response = await productModel.deleteProduct(_id);

    if (response) {
      return res.status(200).json(response);
    }

    return res.status(400).json("Have error in database");
  },
  updateProduct: async (req, res) => {
    const thumb_nail = req.file;
    const { _id, ...data } = req.body;

    try {
      if (thumb_nail) {
        const newProduct = {
          ...data,
          thumb_nail: thumb_nail?.filename || "",
        };
        const response = await productModel.updateProduct(_id, newProduct);
        return res.status(200).json(response);
      } else {
        const response = await productModel.updateProduct(_id, data);
        return res.status(200).json(response);
      }
    } catch (err) {
      if (err.codeName === "DuplicateKey") {
        return res.status(400).json({
          duplicateKeys: err.keyPattern,
        });
      }

      res.status(400).json(err);
    }
  },
};
