const express = require("express") ;
const router = express.Router() ;

const multer  = require('multer') ;
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/account.validates");
const Accounts = require("../../controller/admin/accounts.controller");
const middlewaresAuth = require("../../middlewares/admin/middlewares.auth");

router.get("/", Accounts.index);

// GET /admin/accounts/create

router.get("/create", Accounts.create);

router.post("/create",upload.single('avatar'),validate.validateAccount,uploadCloud.uploadSingle, Accounts.createPost);

// GET /admin/accounts/edit/:ID

router.get("/edit/:id", Accounts.edit);

// PATCH /admin/accounts/edit/:id

router.patch("/edit/:id",   upload.single('avatar'),validate.validateEdit ,uploadCloud.uploadSingle ,Accounts.editPatch);

module.exports = router ;