const express = require("express") ;
const router = express.Router() ;
const category = require("../../controller/admin/category.controller");

const multer  = require('multer') ;
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer() ;

router.get("/", category.index);

// GET /admin/products-category/create

router.get("/create", category.create);

// POST /admin/products-category/create

router.post("/create",
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
 category.createPost);

module.exports = router