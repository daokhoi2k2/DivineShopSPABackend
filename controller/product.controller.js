const productModel = require("../model/product.model");
const tagModel = require("../model/tag.model");
module.exports = {
  getAllProducts: async (req, res) => {
    const response = await productModel.getAllProducts();

    res.status(200).json(response);
  },
  getProductsList: async (req, res) => {
    try {
      const { page = 1, limit = 8, slug, ...filter } = req.query;
      const { category_id: categoryId, price_from: priceFrom, price_to: priceTo, sort, q } = filter;
      const regexQueryPattern = new RegExp(`${q}`, "gi");
      const tagInfo = await tagModel.getTagByText(regexQueryPattern);

      const skip = (page - 1) * limit;
      const filterQuery = {};
      categoryId && (filterQuery.categoryId = categoryId);
      priceFrom && (filterQuery.price_promotion = { $gte: priceFrom });
      priceTo && (filterQuery.price_promotion = { ...filterQuery.price_promotion, $lte: priceTo });

      q && (filterQuery.$or = [{ name: { $regex: regexQueryPattern } }]);
      q && tagInfo?._id && filterQuery.$or.push({ tags: tagInfo._id.toString() });

      sort &&
        (() => {
          switch (sort) {
            case "sales-desc":
              filterQuery.sort = { quantity_sold: -1 };
              break;
            case "date-desc":
              filterQuery.sort = { created_at: -1 };
              break;
            case "price-asc":
              filterQuery.sort = { price_promotion: 1 };
              break;
            case "price-desc":
              filterQuery.sort = { price_promotion: -1 };
              break;
            case "name-asc":
              filterQuery.sort = { name: 1 };
              break;
            case "name-desc":
              filterQuery.sort = { name: -1 };
              break;
            default:
              filterQuery.sort = {};
              break;
          }
        })();
      
      slug && (() => {
        switch(slug) {
          case 'featured': 
            filterQuery.quantity_sold = { $gte: 1000 }
            filterQuery.sort = { quantity_sold: -1 };
            break;
          case 'wallet': 
            filterQuery.categoryId = '6248711b3fd18664315ec4f6'
            break;
        }
      })()


      const response = await productModel.getProductsList(limit, skip, filterQuery);

      // Catch if have slug in query return other response
      if(slug) {

          return res.status(200).json({
              list: response,
              isMore: response.length >= 8,
          })
      }

      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  getListAutoComplete: async (req, res) => {
    try {
      const { q } = req.query;
      const regexQueryPattern = new RegExp(`${q}`, "gi");
      if(q.length) {
        const response = await productModel.getListAutoComplete(regexQueryPattern);
        res.status(200).json(response);
      } else {
        const response = await productModel.getProducsMostQuantity();
        res.status(200).json(response);
      }

    } catch (err) {
      res.status(400).json(err);
    }
  },
  getProductFilter: async (req, res) => {
    res.send("ccc");
  },
  getProductByHashName: async (req, res) => {
    try {
      const hash_name = req.params.hash_name;
      const response = await productModel.getProductByHashName(hash_name);
 
      if(response) {
        res.status(200).json(response);
      } else {
        res.status(404).json("Not found")
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
  addProduct: async (req, res) => {
    const thumb_nail = req.file;
    const newProduct = {
      ...req.body,
      thumb_nail: thumb_nail?.filename || "",
    };

    const response = await productModel.addProduct(newProduct);

    res.status(200).json(response);
  },
  deleteProduct: async (req, res) => {
    const _id = req.params._id;

    const response = await productModel.deleteProduct(_id);

    if (response) {
      return res.status(200).json(response);
    }

    return res.status(400).json("Have error in database");
  },
  updateProduct: async (req, res) => {
    const thumb_nail = req.file;
    const { _id, ...data } = req.body;
    try {
      if (thumb_nail) {
        const newProduct = {
          ...data,
          thumb_nail: thumb_nail?.filename || "",
        };
        const response = await productModel.updateProduct(_id, newProduct);
        return res.status(200).json(response);
      } else {
        const response = await productModel.updateProduct(_id, data);
        return res.status(200).json(response);
      }
    } catch (err) {
      if (err.codeName === "DuplicateKey") {
        return res.status(400).json({
          duplicateKeys: err.keyPattern,
        });
      }

      res.status(400).json(err);
    }
  },
};
