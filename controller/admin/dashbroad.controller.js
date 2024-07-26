//[GET] /admin/dashbroad
const config = require("../../config/system");
const Product = require("../../models/product.model");
const Product_Category = require("../../models/products-category");
const Account = require("../../models/accounts.model");
const User = require("../../models/user.model");

module.exports.index = async (req,res) => {
    const statistic = {
        products_category :{
            total: 0,
            active: 0,
            inactive: 0,
        },
        products : {
            total: 0,
            active: 0,
            inactive: 0,
        },
        accounts : {
            total: 0,
            active: 0,
            inactive: 0,
        },
        users :{
            total: 0,
            active: 0,
            inactive: 0,
        }
    }

    //product
    statistic.products.total  = await Product.countDocuments({
        deleted : false
    })
    statistic.products.active  = await Product.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.products.inactive  = await Product.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // products_category 
    statistic.products_category.total  = await Product_Category.countDocuments({
        deleted : false
    })
    statistic.products_category.active  = await Product_Category.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.products_category.inactive  = await Product_Category.countDocuments({
        deleted : false,
        status : "inactive"
    })

    //account 
    statistic.accounts.total  = await Account.countDocuments({
        deleted : false
    })
    statistic.accounts.active  = await Account.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.accounts.inactive  = await Account.countDocuments({
        deleted : false,
        status : "inactive"
    })

    //User
    statistic.users.total  = await User.countDocuments({
        deleted : false
    })
    statistic.users.active  = await User.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.users.inactive  = await User.countDocuments({
        deleted : false,
        status : "inactive"
    })

    


    res.render(`${config.prefixAdmin}/pages/dashbroad/index.pug`,{
        pageTitle : "Trang tổng quan",
        products : statistic.products,
        products_category : statistic.products_category,
        account : statistic.accounts,
        user:  statistic.users
    });
}