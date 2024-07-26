const MD5 = require("md5");
const Account = require("../../models/accounts.model");
const config = require("../../config/system");

module.exports.login = async (req, res) => {
    
    res.render("admin/pages/auth/login.pug", {
        pageTitle: "Trang đăng nhập",
        
    });
};

module.exports.loginPost = async (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password ;
    const user = await Account.findOne({
        email : email,
        deleted: false
    })

    if(!user.email){
        req.flash("error","Email không tồn tại");
        res.redirect('back');
        return ;
    }

    if(user.password != MD5(password)){
        req.flash("error","Mật khẩu không chính xác");
        res.redirect('back');
        return ;
    }

    if(user.status != "active"){
        req.flash("error","Tài khoản đã bị xóa");
        res.redirect('back');
        return ;
    }
    res.cookie("token",user.token);
    res.redirect(`/${config.prefixAdmin}/dashboard`);
}

module.exports.logout = async (req, res) => {
    
    res.clearCookie("token");
    res.redirect(`/${config.prefixAdmin}/auth/login`);
};