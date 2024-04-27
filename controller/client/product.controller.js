const product = require("../../models/product.model");
//[GET] /product



module.exports.index = async (req, res) => {
    const products = await product
        .find({
            status: "active",
            deleted: false
        })
        .sort({position : "desc"}); //tìm ra tất cả các bản ghi trong database


    for (const item of products){
        item.priceNew = (item.price - item.price*(item.discountPercentage/100)).toFixed(0);
    }
    console.log(products)
    res.render("client/pages/products/index.pug",{
        pageTitle :"Danh sách sản phẩm",
        products: products
    });
}

module.exports.detail = async (req, res) => {
    const slug = req.params.slug;
    const products = await product
        .findOne({
            slug : slug,
            deleted: false,
            status : "active"
        })
    console.log(products);
    res.render("client/pages/products/detail.pug",{
        pageTitle : "Chi tiết sản phẩm",
        product : products
    });
}

