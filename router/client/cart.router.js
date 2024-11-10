const express = require("express") ;
const router = express.Router() ;
const Cart  = require("../../controller/client/cart.controller");

router.post("/add/:id", Cart.addPost);

// Cannot GET /cart

router.get("/", Cart.index);

// Cannot GET /cart/delete/id

router.get("/delete/:id", Cart.delete);

router.patch("/update/:id/:quantity", Cart.update);

module.exports = router ;