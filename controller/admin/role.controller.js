const Role = require("../../models/role.model");
const config = require("../../config/system");

module.exports.index = async (req,res) => {
    const find = {
        deleted : false
    }
    const records = await Role.find(find);
    res.render("admin/pages/role/index.pug",{
        pageTitle : "Nhóm quyền",
        records : records
    });   
}

module.exports.create= async (req,res) => {
    res.render("admin/pages/role/create.pug",{
        pageTitle : "Thêm mới nhóm quyền",
    });   
}

module.exports.createPost = async (req,res) => {
    const record = new Role(req.body);
    record.save();
    // res.render("admin/pages/role/create.pug",{
    //     pageTitle : "Thêm mới nhóm quyền",
    // });   
    req.flash("success","Thêm mới quyền thành công");
    res.redirect(`/${config.prefixAdmin}/roles`);
}

module.exports.edit = async (req,res) => {
   try {
    const record = await Role.findOne({
        _id: req.params.id,
        deleted : false
    })

    res.render("admin/pages/role/edit.pug",{
        pageTitle : "Chỉnh sửa nhóm quyền",
        data:record
    });  
   }catch (error) {
    res.redirect(`/${config.prefixAdmin}/roles`);  
   }
}

module.exports.editPatch = async (req,res) => {
    try {
        await Role.updateOne({
            _id : req.params.id
        },req.body)
    
        req.flash("succees","Chỉnh sửa quyền thành công");
        
    } 
    catch (error) {
        req.flash("error","Chỉnh sửa quyền không thành công");
    }
    res.redirect(`/${config.prefixAdmin}/roles`); 
}

module.exports.permission = async (req,res) => {
    const records = await Role.find({
        deleted : false
    })
    res.render("admin/pages/role/permission",{
        pageTitle : "Phân quyền",
        records : records
    })
}

module.exports.permissionPatch = async (req,res) => {
    const Roles = JSON.parse(req.body.roles);
    console.log(Roles);
    for (const role of Roles){
        await Role.updateOne({
            _id : role.id,
            deleted: false
        },{
            permissions : role.permissions
        });
    }
    req.flash("success", "Cập nhật quyền thành công");
    res.redirect(`back`);
    //res.send("ok");
}