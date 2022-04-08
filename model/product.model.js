const Product = require("../schema/product.schema");

module.exports = {
    getAllProducts: async () => {
        return Product.find();
    },
    addProduct: async (newProduct) => {
        return Product.create(newProduct)
        // console.log(newProduct)
        // return 1;
    }
}
