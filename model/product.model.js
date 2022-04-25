const Product = require("../schema/product.schema");

module.exports = {
  getAllProducts: async () => {
    return Product.find();
  },
  getProductsList: (limit, skip, filter) => {
    try {
      const { sort, ...filterFind } = filter;
      const query = Product.find(filterFind).limit(limit).skip(skip).sort(sort);
      return query;
    } catch (err) {
      console.log(err);
    }
  },
  getProductByHashName: async (name_url) => {
    // return Product.findOne({ name_url }).populate("categoryId");
    // return Product.findOne({ name_url }).populate("categoryId").populate({ path: "tags", select: "tag_name -_id"})
    return Product.findOne({ name_url })
      .populate("categoryId")
      .populate({ path: "tags", select: "tag_name" });
  },
  getProducsMostQuantity: () => {
    return Product.find({}).sort({quantity_sold: 1}).limit(7);
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
  getListAutoComplete: async (regexQueryPattern) => {
    return Product.find({ name: { $regex: regexQueryPattern } }, { name: 1, name_url: 1 }).limit(7);
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
