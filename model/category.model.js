const Category = require("../schema/category.schema");

module.exports = {
    getAllCategories: async () => {
        return Category.find();
    }
}
