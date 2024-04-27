const express = require("express") ;
const router = express.Router() ;
const multer  = require('multer')
const storage = require("../../helper/storageMulter.helper");
const validates = require("../../validates/admin/product.validates");

const upload = multer({ storage: storage })

const product = require("../../controller/admin/product.controller");

router.get("/", product.index);

router.patch("/changestatus/:status/:id", product.changeStatus);

router.patch("/change-multi", product.changeMulti);

//[DELETE] :  /admin/products/delete/

router.delete("/delete/:id", product.delete);

// [GET] : /admin/products/create

router.get("/create", product.create);

router.post("/create", upload.single('thumbnail'),validates.validateProduct, product.createPost);

// [GET] : /admin/products/edit

router.get("/edit/:id", product.edit);

// [PATCH] : /admin/products/edit

router.patch("/edit/:id",  upload.single('thumbnail'),validates.validateProduct, product.editPatch);

// GET /admin/products/detail/id

router.get("/detail/:id",product.detail);


module.exports = router ;