const category = require("../schema/category.schema");

module.exports = {
    getAllCategories: async () => {
        return category.find();
    }
}
