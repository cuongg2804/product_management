const express = require("express") ;
const router = express.Router() ;
const Checkout   = require("../../controller/client/checkout.controller");


router.get("/", Checkout.index);

// Cannot POST /checkout/order

router.post("/order", Checkout.order);

// /checkout/success/668666d071f60cd28730378e

router.get("/success/:id", Checkout.success);

module.exports = router ;