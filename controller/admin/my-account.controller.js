const config = require("../../config/system");

module.exports.index = (req ,res) =>{
    res.render("admin/pages/my-account/index.pug",{
        pageTittle : "Thông tin tài khoản"
    })
}