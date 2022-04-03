const categoryModel = require("../model/category.model");

module.exports = {
  getAllCategories: async (req, res) => {
    const categories = await categoryModel.getAllCategories();

    res.json(categories);
  },
};
