const Product = require("../schema/product.schema");

module.exports = {
  getAllProducts: async () => {
    return Product.find();
  },
  getProductsList: (limit, skip, filter) => {
    try {
      const { sort, ...filterFind } = filter;
      return Product.find(filterFind).limit(limit).skip(skip).sort(sort);
    } catch (err) {
      console.log(err);
    }
  },
  getProductByHashName: async (name_url) => {
    return Product.findOne({ name_url }).populate("categoryId");
  },
  getProductsArray: async (array) => {
    return Product.find(
      {
        _id: {
          $in: array,
        },
      },
      {
        description: 0,
        quantity_sold: 0,
      }
    );
  },
  addProduct: async (newProduct) => {
    return Product.create(newProduct);
    // console.log(newProduct)
    // return 1;
  },
  updateProduct: async (_id, data) => {
    return Product.findOneAndUpdate({ _id }, data);
  },
  deleteProduct: async (_id) => {
    return Product.findOneAndDelete({ _id });
  },
};
