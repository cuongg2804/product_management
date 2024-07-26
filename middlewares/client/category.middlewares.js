const ProductCategory = require("../../models/products-category");

const createTreeHelper = require("../../helper/category.helper");

module.exports.category = async (req, res, next) => {
  const productCategory = await ProductCategory.find({
    deleted: false,
    status: "active"
  });

  const newProductCategory = await createTreeHelper(productCategory);

  res.locals.layoutProductCategory = newProductCategory;

  next();
}