const User = require("../../models/user.model");

//[GET] /

const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const ProductFeatured = await Product.find({
        featured : "1",
        deleted : false ,
        status : "active"
    }).limit(4).select("-description")
    for (const item of ProductFeatured){
        item.priceNew = (item.price -  item.price*(item.discountPercentage/100)).toFixed(0);
      
    }

    const ProductNew = await Product.find({
        deleted : false ,
        status : "active"
    }).limit(6).select("-description").sort({discountPercentage :"asc"});
    for (const item of ProductNew){
        item.priceNew = (item.price -  item.price*(item.discountPercentage/100)).toFixed(0);
      
    }

    
    res.render("client/pages/home/index.pug", {
        pageTitle : "Trang chủ",
        productFeatured : ProductFeatured,
        ProductNew : ProductNew,
        title :"Danh sách sản phẩm"
    });
}