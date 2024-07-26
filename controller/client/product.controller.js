const product = require("../../models/product.model");
const products_category = require("../../models/products-category");
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
    const Category = await products_category.findOne({
        _id : products.products_category_id,
        deleted : false,
        status : "active" 
    });
    products.category = await Category;
    products.priceNew = (products.price -  products.price*(products.discountPercentage/100)).toFixed(0);
      
    res.render("client/pages/products/detail.pug",{
        pageTitle : "Chi tiết sản phẩm",
        product : products
    });
}

module.exports.category = async (req, res) => {
    const slug = req.params.slugCategory;
    
    const Category = await products_category
        .findOne({
            slug : slug,
            deleted: false,
            status : "active"
        })


    const listSubCategory = async (id) =>{
        let allCategory = [];
        const listSub = await products_category.find({
            parent_id : id,
            deleted : false,
            status : "active"
        }).select("id title");
        allCategory = [...listSub];

        for (const item of allCategory){
            const child = listSubCategory(item.id);
            allCategory= allCategory.concat(child);
        }
        return allCategory;
    } 
    const listSubNew = await listSubCategory(Category.id);
    const listIdSubCategory = listSubNew.map(item => item.id);


    const products = await product.find ({
        products_category_id : {$in : [Category.id,...listIdSubCategory ]},
        deleted: false,
        status : "active"
    })
    
    for (const item of products){
        item.priceNew = (item.price -  item.price*(item.discountPercentage/100)).toFixed(0);
      
    }
    res.render("client/pages/products/index.pug",{
        pageTitle :"Danh sách sản phẩm",
        products: products,
        title : Category.title
    });
}

