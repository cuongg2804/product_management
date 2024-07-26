const Cart = require("../../models/carts.model");
const Product = require("../../models/product.model");
const Order = require("../../models/orders.model");
module.exports.index = async (req , res) =>{
    const idCart = req.cookies.idCart;
    const cart = await Cart.findOne({
        _id : idCart
    })
    cart.totalPrice = 0 ;
    for (const item of cart.products){
        const product = await Product.findOne({
            _id : item.product_id,
            deleted : false,
            status : "active"
        })
     
       product.priceNew = (product.price -  product.price*(product.discountPercentage/100)).toFixed(0);
       product.totalPrice =product.priceNew * item.quantity;
        cart.totalPrice += product.totalPrice;

        item.infoProduct = product;

    }
    
   res.render("client/pages/checkouts/index.pug",{
        pageTitle : "Giỏ hàng",
        cartDetail : cart 
   })


}

module.exports.order= async (req , res) =>{
    const dataCart = await Cart.findOne({
        _id : req.cookies.idCart
    })

    const products = [];

    for (const item of dataCart.products){
        const dataProduct = await Product.findOne({
            _id : item.product_id
        })
        
        const objProduct = {
            product_id: dataProduct.id,
            price: dataProduct.price,
            discountPercentage: dataProduct.discountPercentage,
            quantity: item.quantity
        }; 

       products.push(objProduct);
    }

    const userInfo = req.body;

    const dataOder = {
        // user_id: String,
        cart_id: dataCart.id,
        userInfo : userInfo,
        products: products
    }

   const newOrder = new Order(dataOder);
   await newOrder.save();

   const updateProducts = await Cart.updateOne({
        _id : req.cookies.idCart
    },{
        products : []
    })  
    res.redirect(`/checkout/success/${newOrder.id}`);
}


module.exports.success = async (req , res) => {
    try {
        const idOrder = req.params.id;
        const order = await Order.findOne({
            _id: idOrder
    });
    order.totalPrice = 0 ;
    for(const item of order.products){
        const dataProduct = await Product.findOne({
            _id : item.product_id
        })
        item.price =  (item.price - item.price*(item. discountPercentage/100)).toFixed(0); 
        item.totalPrice = item.price * item.quantity ;
        item.thumbnail = dataProduct.thumbnail;
        item.title = dataProduct.title;
    
        order.totalPrice += item.totalPrice ;
    }

    res.render("client/pages/checkouts/success", {
        pageTitle: "Đặt hàng thành công",
        order : order
    });
    } catch (error) {
        res.redirect("/");
    }
}