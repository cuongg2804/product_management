const express = require("express") ;
const router = express.Router() ;
const multer  = require('multer') ;
const controller = require("../../controller/admin/setting.controller");

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");

// GET /admin/setting/general

router.get("/general",controller.index );

// PATCH /admin/settings/general

router.patch("/general", upload.single('logo'), uploadCloud.uploadSingle, controller.indexPatch );

module.exports = router ;