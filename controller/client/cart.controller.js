const Cart = require("../../models/carts.model");
const Product = require("../../models/product.model")
module.exports.addPost = async (req , res) =>{
  try {
    const idCart  =req.cookies.idCart;
    const quantity = parseInt(req.body.quantity);
    const id_product = req.params.id;

    const cart = await Cart.findOne({
        _id : idCart,
    })
  
    const existProduct = cart.products.find(item => item.product_id == id_product);
    
    if(existProduct){
        const productQuantity = existProduct.quantity + quantity;

        await Cart.updateOne({
            _id : idCart,
            "products.product_id":id_product
        },{
            $set: { "products.$.quantity": productQuantity }
        })
        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng.");
    }
    else{
        const objProduct = {
            product_id  : id_product,
            quantity : quantity
        }
    
        await Cart.updateOne({
            _id : idCart
        },{
             $push : {products : objProduct}
        })
        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng.");
    }
    
  } catch (error) {
    req.flash("success", "Thêm sản phẩm vào giỏ hàng thất bại.");
  }
    res.redirect("back");
 
}

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
    
   res.render("client/pages/cart/index.pug",{
        pageTitle : "Giỏ hàng",
        cartDetail : cart 
   })
}

module.exports.delete = async (req , res) =>{
    const productID = req.params.id;
    const cartID = req.cookies.idCart;

    await Cart.updateOne ({
        _id : cartID,
        
    },{
        $pull : {products : {product_id : productID}}
    })
    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng!");
    res.redirect('back');
}

module.exports.update = async (req , res) => {
    const idCart = req.cookies.idCart;
    
    
    const productId = req.params.id;
    const quantity = parseInt(req.params.quantity);
    const cartId = req.cookies.idCart;
   
    await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
    }, {
        $set: { "products.$.quantity": quantity }
    });
    

    const cart = await Cart.findOne({
        _id : idCart
    })
    cart.totalPriceBill = 0 ;
    let newPrice = 0 ;
    for (const  item of cart.products){
        const product = await Product.findOne({
            _id : item.product_id,
            deleted : false,
            status : "active"
        })
        
        product.PriceNew = (product.price -  product.price*(product.discountPercentage/100)).toFixed(0);
        cart.totalPrice =product.PriceNew  * item.quantity;
        if(item.product_id == productId){
            newPrice = product.PriceNew;
        }
        cart.totalPriceBill += cart.totalPrice;
    }

   // req.flash("success", "Cập nhật sản phẩm thành công!");
    res.json({
        code : "200",
        message :"Cập nhật thành công!",
        totalPriceBill :cart.totalPriceBill,
        totalPrice :  newPrice * quantity

    });
}