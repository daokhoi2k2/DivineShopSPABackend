const Product = require("../schema/product.schema");

module.exports = {
    getAllProducts: async () => {
        return Product.find();
    },
    getProductsList: (limit, skip) => {
        return Product.find().limit(limit).skip(skip);
    },
    getProductByHashName: async (name_url) => {
        return Product.findOne({name_url}).populate("categoryId")
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
