const productModel = require("../model/product.model");
module.exports = {
  getAllProducts: async (req, res) => {
    const response = await productModel.getAllProducts();

    res.status(200).json(response);
  },
  addProduct: async (req, res) => {
    const thumb_nail = req.file;
    const newProduct = {
      ...req.body,
      thumb_nail: thumb_nail?.filename || ""
    };
    
    const response = await productModel.addProduct(newProduct);


    res.status(200).json(response);
  }
};
