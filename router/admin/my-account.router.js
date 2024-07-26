const my_account = require("../../controller/admin/my-account.controller");
const express = require("express") ;
const router = express.Router() ;

router.get("/",my_account.index);

router.get("/",my_account.index);

module.exports = router ;
