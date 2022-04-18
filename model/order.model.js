const { query } = require("express");
const Order = require("../schema/order.schema");

module.exports = {
  getAllOrders: async () => {
    return Order.find();
  },
  // getProductsList: (limit, skip, filter) => {
  //   try {
  //     const { sort, ...filterFind } = filter;
  //     return Product.find(filterFind).limit(limit).skip(skip).sort(sort);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getProductByHashName: async (name_url) => {
  //   return Product.findOne({ name_url }).populate("categoryId");
  // },
  addOrder: async (newOrder) => {
    return Order.create(newOrder);
  },
  // updateProduct: async (_id, data) => {
  //   return Product.findOneAndUpdate({ _id }, data);
  // },
  // deleteProduct: async (_id) => {
  //   return Product.findOneAndDelete({ _id });
  // },
};
