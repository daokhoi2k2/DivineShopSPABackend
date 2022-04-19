const productModel = require("../model/product.model");
const orderModel = require("../model/order.model");
const userModel = require("../model/user.model");

const getMemberShipInfo = (membership) => {
  switch (membership) {
    case 1:
      return {
        text: "Vip Đồng",
        discount: 0,
      };
    case 2:
      return {
        text: "Vip Bạc",
        discount: 1,
      };
    case 3:
      return {
        text: "Vip Vàng",
        discount: 2,
      };
    case 4:
      return {
        text: "Vip Kim Cương",
        discount: 3,
      };
  }
};

module.exports = {
  getAllOrders: async (req, res) => {
    const response = await orderModel.getAllOrders();

    res.status(200).json(response);
  },
  getOrderById: async (req, res) => {
    const id = req.params.id;
    console.log("ID", id);
    const response = await orderModel.findOrderById(id);
    res.status(200).json(response);
  },
  getOrderUser: async (req, res) => {
    const userId = req.user._id;
    const { page, limit = 20, ...filter } = req.query;

    const {
      order_id: orderId,
      price_from: priceFrom,
      price_to: priceTo,
      date_from: dateFrom,
      date_to: dateTo,
    } = filter;
    const skip = (page - 1) * limit;
    const filterQuery = {};
    orderId && (filterQuery._id = orderId);
    priceFrom &&
      (filterQuery.totals = { $elemMatch: { title: "Thành tiền", value: { $gte: +priceFrom } } });
    priceTo &&
      (filterQuery.totals = {
        ...filterQuery.totals,
        $elemMatch: { title: "Thành tiền", value: { $lte: +priceTo } },
      });
    dateFrom && (filterQuery.createdAt = { $gte: dateFrom });
    dateTo && (filterQuery.createdAt = { ...filterQuery.createdAt, $lte: dateTo });

    console.log("[filterQuery]", filterQuery);
    const userInfo = await userModel.findUserById(userId);
    const orderList = await orderModel.getOrderUser(userInfo.email, limit, skip, filterQuery);
    res.status(200).json(orderList);
  },
  addOrder: async (req, res) => {
    try {
      const newOrder = req.body;
      const products = newOrder.entries.map((item) => {
        return item.productId;
      });

      /* Check user money is enough ? */

      // Get list info product by list id
      const productsInfo = await productModel.getProductsArray(products);

      // add quantity to product object in entries
      const entries = productsInfo.map((item, index) => {
        let quantity = 0;
        if (item._id.toString() === newOrder.entries[index].productId) {
          quantity = newOrder.entries[index].quantity;
        }
        return {
          product: item,
          quantity,
        };
      });

      // Check email have account for discount membership
      const user = await userModel.getMemberShipUserByEmail(newOrder.email);

      const totalCart = entries.reduce((total, cur) => {
        return total + cur.product.price_promotion * cur.quantity;
      }, 0);

      const totals = [
        {
          title: "Thành tiền",
          value: totalCart,
        },
        {
          title: "Tổng đơn hàng",
          value: totalCart,
        },
      ];

      if (user) {
        const membershipInfo = getMemberShipInfo(user.membership);
        const discountMembership = totalCart * (membershipInfo?.discount / 100) || 0;

        if (membershipInfo) {
          totals.push({
            title: `Thưởng tiền khách (${membershipInfo.text}) - Hoàn lại vào số dư `,
            value: discountMembership,
          });
        }
        // If have user we need discount and show balance current in order
        totals.push({
          title: "Số dư hiện tại",
          value: user.balance,
        });
        // deduct money from the account
        const remainingBalance = user.balance - totalCart;
        if (remainingBalance >= 0) {
          const responseDeduct = await userModel.deductMoney(
            user._id,
            remainingBalance + discountMembership // Refund membership
          );

          const result = {
            entries,
            email: newOrder.email,
            status: 1,
            totals,
          };

          const response = await orderModel.addOrder(result);
          res.status(200).json(response);
        } else {
          const result = {
            entries,
            email: newOrder.email,
            status: 0,
            totals,
          };

          const response = await orderModel.addOrder(result);
          res.status(400).json({
            response,
            message: "Không đủ số dư để thanh toán",
          });
        }
      } else {
        console.log("Không có account");
      }

      res.status(400).json();
      // const totals = [
      // {
      //   title: "Thành tiền", value:
      // }
      // ]

      // const isEnough = await userModel.
      // console.log(entries)
    } catch (err) {
      console.log("Lỗi", err);
      res.status(400).json(err);
    }
    // res.status(200).json(response);
  },
  // deleteProduct: async (req, res) => {
  //   const _id = req.params._id;

  //   const response = await productModel.deleteProduct(_id);

  //   if (response) {
  //     return res.status(200).json(response);
  //   }

  //   return res.status(400).json("Have error in database");
  // },
  // updateProduct: async (req, res) => {
  //   const thumb_nail = req.file;
  //   const { _id, ...data } = req.body;

  //   try {
  //     if (thumb_nail) {
  //       const newProduct = {
  //         ...data,
  //         thumb_nail: thumb_nail?.filename || "",
  //       };
  //       const response = await productModel.updateProduct(_id, newProduct);
  //       return res.status(200).json(response);
  //     } else {
  //       const response = await productModel.updateProduct(_id, data);
  //       return res.status(200).json(response);
  //     }
  //   } catch (err) {
  //     if (err.codeName === "DuplicateKey") {
  //       return res.status(400).json({
  //         duplicateKeys: err.keyPattern,
  //       });
  //     }

  //     res.status(400).json(err);
  //   }
  // },
};
