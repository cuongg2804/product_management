const Account = require("../../models/accounts.model");
const Role = require("../../models/role.model");
const MD5 = require("md5");
const generateRandom = require("../../helper/generateRandom.helper");
const config = require("../../config/system");
// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false,
  };
  // End Find

const records = await Account.find(find);
for(const record of records){ 
    const role = await Role.findOne({
        _id:  record.role_id,
        deleted : false
    })

    record.roleTitle = role.title
}

  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted : false 
    })
    
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Thêm tài khoản",
        role : roles
    });
};

module.exports.createPost = async (req, res) => {
    req.body.password = MD5(req.body.password);
    req.body.token = generateRandom.generateRandomString(30);

    const newRecord =  new Account(req.body) ;
    await newRecord.save() ;
    req.flash("success", "Thêm tài khoản thành công");

    res.redirect(`/${config.prefixAdmin}/accounts`); 

};

module.exports.edit = async (req, res) => {
    const id = req.params.id ;
    const record = await Account.findOne({
        _id : id,
        deleted: false 
    })
    const role = await Role.find({
        deleted: false 
    })
  
    res.render("admin/pages/accounts/edit.pug", {
        pageTitle: "Sửa tài khoản",
        data: record,
        role : role
    });
    
};

module.exports.editPatch = async (req, res) =>{
    try{
        if(req.body.password){
            req.body.password = MD5(req.body.password);
        }
        else {
            delete req.body.password;
        }
    
       await Account.updateOne({
            _id : req.params.id,
            deleted : false 
        },req.body);
        req.flash("success", "Sửa tài khoản thành công");
        res.redirect('back');
    }
    catch (error){
        res.redirect(`${config.prefixAdmin}/accounts`);
    }
     
}