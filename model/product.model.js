const Product = require("../schema/product.schema");

module.exports = {
    getAllProducts: async () => {
        return Product.find();
    },
    addProduct: async (newProduct) => {
        return Product.create(newProduct)
        // console.log(newProduct)
        // return 1;
    },
    updateProduct: async (_id, data) => {
        return Product.findOneAndUpdate({_id}, data)
    },
    deleteProduct: async (_id) => {
        return Product.findOneAndDelete({_id})
    }
}
