const express = require("express") ;
const router = express.Router() ;
const productController = require("../../controller/client/product.controller");

router.get("/", productController.index );

// [GET] /products/detail/slug

router.get("/detail/:slug", productController.detail);

// Cannot GET /products/dien-thoai

router.get("/:slugCategory", productController.category);

module.exports = router ;