const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    const keywordRegex = new RegExp(keyword,"i");

    const Products = await Product.find({
        title : keywordRegex,
        deleted : false,
        status : "active"
    })
    for (const item of Products){
        item.priceNew = (item.price -  item.price*(item.discountPercentage/100)).toFixed(0);
      
    }

    res.render("client/pages/products/index.pug", {
        pageTitle : "Kết quả tìm kiếm",
        title : "Kết quả tìm kiếm cho " + keyword,
        products :Products,
        keyword : keyword
    });
}