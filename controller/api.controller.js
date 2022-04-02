const categoryModel = require("../model/category.model");

module.exports = {
    index: (req, res) => {
        res.send("Index api");
    },

    // Product
    getAllProducts: (req, res) => {
        res.json("All Product")
    },


    // Category
    getAllCategories: async (req, res) => {
        const categories = await categoryModel.getAllCategories();

        res.json(categories)
    }
}