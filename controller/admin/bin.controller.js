const product = require("../../models/product.model");
const filter = require("../../helper/filter.helper");
const Pagination = require("../../helper/pagination.helper");
const config = require("../../config/system");

module.exports.index = async (req,res) =>{

    const find_list = {
        deleted : true
    }
 
    //Ba nút lọc
    const filterStatus = filter(req);
    //End ba nút

    //Search
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find_list.title = regex ;
    }

    if(req.query.status) {
        find_list.status = req.query.status
    }
    //End Search 

    //Pagination 
    const countRecord = await product.countDocuments(find_list);
    const objectPagination = Pagination(req,countRecord) ;   
    //End Pagination

    const products_list  = await product.find(find_list).limit(objectPagination.limitItem).skip(objectPagination.skipItem);

    res.render("admin/pages/bin/bin.pug",{
        pageTitle : "Trang thùng rác",
        products : products_list,
        filterStatus : filterStatus,
        keyword : req.query.keyword,
        objectPagination : objectPagination
    });
}

module.exports.recovery = async (req, res) => {
    const id = req.params.id ;
    console.log(id);
    await product.updateOne({
        _id: id
    },{
        deleted: false
    })
    
    res.redirect(`back`);
}