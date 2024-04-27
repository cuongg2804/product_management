const express = require("express") ;
const router = express.Router() ;
const dashBroad = require("../../controller/admin/dashbroad.controller") ;

router.get("/", dashBroad.index);

module.exports = router