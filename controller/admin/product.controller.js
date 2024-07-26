//[GET] /admin/products
const product = require("../../models/product.model");
const filter = require("../../helper/filter.helper");
const Pagination = require("../../helper/pagination.helper");
const config = require("../../config/system");
const productCategory = require("../../models/products-category");
const createTree  = require("../../helper/category.helper");
const Account = require("../../models/accounts.model");

//[GET] /admin/products

module.exports.index = async (req,res) =>{

    const find_list = {
        deleted : false
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

    //Sort
    const sort = {} ;
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue ;
    }
    else {
        sort.position = "desc" ;
    }
    //End Sort 

    const products_list  = await product
        .find(find_list)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skipItem)
        .sort(sort);

    for (const product of products_list){
        const createByName = await Account.findOne({
            _id : product.createdBy
        })
        if(createByName){
            product.createByFullName = createByName.fullName
        }
    }

    res.render("admin/pages/product/index.pug",{
        pageTitle : "Danh sách sản phẩm",
        products : products_list,
        filterStatus : filterStatus,
        keyword : req.query.keyword,
        objectPagination : objectPagination
    });
}

//[PATCH] /admin/products/changestatus

module.exports.changeStatus = async (req,res) =>{
    const id = req.params.id ;
    const status = req.params.status ;
    
    await product.updateOne({
        _id : id
    },{
        status : status 
    })

    req.flash("success","Cập nhật thành công");
    res.redirect(`back`);
}

//[PATCH] /admin/products/change-multi

module.exports.changeMulti = async (req, res) => {
    const id = req.body.ids.split("; ");
    const status =  req.body.type ; 


    switch(status){
        case "active" : 
        case "inactive" :
            await product.updateMany({
                _id : {$in : id} 
            },{
                status : status, 
                updatedBy : res.locals.user.id
            })
            req.flash("success","Cập nhật thành công ");
            break;
        case "delete-all":
            await product.updateMany({
                _id : {$in : id} 
            },{
                deleted : true,
                deletedAt : new Date(),
                deletedBy : res.locals.user.id
            })
            break;
        case "change-position":
            for (item of id){
                let [ids, pos] = item.split("-");
                pos = parseInt(pos);
                await product.updateMany({
                    _id : ids
                },{
                    position : pos
                })
            }
            req.flash("success","Thay đổi vị trí thành công ");
            break;
        default:
            break;
        
    }

    res.redirect(`back`);
}

//[DELETE] /admin/products/delete/

module.exports.delete = async (req,res) => {
    const id = req.params.id ;

    await product.updateOne({
        _id: id
    },{
        deleted: true,
        deletedAt : new Date(),
        deletedBy : res.locals.user.id
    })
    req.flash("success","Xóa thành công ");
    res.redirect(`back`);
}

// [GET] : /admin/products/create

module.exports.create = async (req,res) => {
    const category = await productCategory.find({
        deleted:false
    })
    
    const newRecords = createTree(category);
    res.render("admin/pages/product/create.pug",{
        pageTitle: "Tạo mới sản phẩm",
        category : newRecords
    });
}

module.exports.createPost = async (req,res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.stock);
    req.body.stock = parseInt(req.body.stock);
    req.body.createdBy = res.locals.user.id;
    
    if(!req.body.position){
        const position = await product.countDocuments({
            deleted : false
        })
        req.body.position = position + 1 ;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    // if(req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}` ;
    // }
    
    const newRecord =  new product(req.body) ;
    await newRecord.save() ;
    req.flash("success", "Thêm mới sản phẩm thành công");

    res.redirect(`/${config.prefixAdmin}/products`); 
}

// [GET] : /admin/products/edit 

module.exports.edit = async (req,res) =>{
    const id = req.params.id ;
    const products = await product.findOne({
        _id: id,
        deleted : false
    })
    const category = await productCategory.find({
        deleted:false
    })
    const newRecords = createTree(category);
    res.render("admin/pages/product/edit.pug",{
        pageTitle : "Chỉnh sửa sản phẩm ",
        products : products,
        category: newRecords
    });
}

module.exports.editPatch = async (req,res) => {
    const id = req.params.id ;     
    req.body.price = parseInt(req.body.price);
    discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    req.body.updatedBy = res.locals.user.id;
    
    await product.updateOne({
        _id: id
    },req.body )
    req.flash("success","Cập nhật thành công thành công ");
    res.redirect(`/${config.prefixAdmin}/products`);
}

module.exports.detail = async (req, res) => {
    const id = req.params.id ;

    const products = await product.findOne({
        _id : id
    })
    res.render("admin/pages/product/detail.pug", {
        pageTitle : "Chi tiết sản phảm",
        product : products
    })
}

