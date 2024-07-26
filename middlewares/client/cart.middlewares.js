const Cart = require("../../models/carts.model");

module.exports.Cart = async (req , res, next) =>{
    if(!req.cookies.idCart){
        const cart = new Cart();
        await cart.save();

        res.cookie("idCart", cart.id);
    }
    else{
        const cart = await Cart.findOne({
            _id : req.cookies.idCart 
        })
        res.locals.miniCart = cart ;
    }
    next();
}