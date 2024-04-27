const express = require("express") ;
const router = express.Router() ;
const Bin = require("../../controller/admin/bin.controller");

router.get("/", Bin.index);

router.patch("/:id", Bin.recovery);

module.exports = router ;