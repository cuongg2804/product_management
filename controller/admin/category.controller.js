const productCategory = require("../../models/products-category");
const config = require("../../config/system");
const filter = require("../../helper/filter.helper");
const createTree  = require("../../helper/category.helper");
// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await productCategory.find({
        deleted : false,
        status : "active"
    })

    const newRecord = createTree(records);

    
    res.render("admin/pages/product-category/index.pug", {
        pageTitle : "Danh mục sản phẩm",
        records : newRecord
    })
}

module.exports.create = async (req, res) => {
    const records = await productCategory.find({
        deleted : false,
        status : "active"
    })
    const newRecords = createTree(records);
    res.render("admin/pages/product-category/create.pug", {
        pageTitle : "Danh mục sản phẩm",
        records : newRecords
    })
}

module.exports.createPost = async (req, res) => {
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }
    else {
        const count = await productCategory.countDocuments();
        req.body.position = count + 1 ;
    }
    const record = new productCategory(req.body);
    await record.save() ;
    req.flash("success","Thêm mới danh mục thành công");
    res.redirect(`/${config.prefixAdmin}/products-category`);
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id ;
        const records = await productCategory.find({
            deleted : false,
            status : "active"
        })
        const newRecords = createTree(records);
        const data = await productCategory.findOne({
            _id : id,
            deleted : false,
            status : "active"
        })
        res.render("admin/pages/product-category/edit.pug",{
            pageTitle :"Chỉnh sửa danh mục sản phẩm",
            data : data,
            records : newRecords
        })
    } catch (error) {
        res.redirect ( `/${config.prefixAdmin}/products-category`);
    }
}

module.exports.editPatch = async (req, res) => {
    req.body.position = parseInt(req.body.position);
    await productCategory.updateOne({
        _id: req.params.id
    },req.body )
    req.flash("success","Cập nhật danh mục sản phẩm thành công");
    res.redirect(`/${config.prefixAdmin}/products-category`);
}