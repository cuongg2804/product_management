const md5 = require('md5');
const randomToken = require("../../helper/generateRandom.helper");
const User = require("../../models/user.model");
const randomNum = require("../../helper/generateRandomNumber.helper");
const ForgotPassword = require("../../models/forgot-password");
const SendEmail = require("../../helper/sendEmail.helper");
const Cart = require("../../models/carts.model");

module.exports.index = async (req, res) => {
    res.render("client/pages/user/index.pug",{
        pageTitle : "Đăng ký tài khoản"
    })
}

module.exports.registerPost = async (req, res) => {
    const emailUser = await User.findOne({
        email : req.body.email
    })
    if(emailUser){
        req.flash("error","Email đã tồn tại!");
        res.redirect("back");
        
        return;
    }
    else{
        const user = {};
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = md5(req.body.password );
        user.tokenUser = randomToken.generateRandomString(30);
        
       const newUser = new User(user);
       await newUser.save();

       res.cookie("tokenUser", User.tokenUser);
       res.redirect("/");
    }
}

module.exports.login = async (req, res) => {
    res.render("client/pages/user/login.pug",{
        pageTitle : "Đăng nhập"
    })
}

module.exports.loginPost = async (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const password = md5(req.body.password);

    const existEmail = await User.findOne({
        email : email,
        deleted : false
    })
 
    if(!existEmail){
        req.flash("error", "Email tồn tại!");
        res.redirect('back');
        return ;
    }
    if(password != existEmail.password){
        req.flash("error", "Sai mật khẩu!");
        res.redirect('back');
        return ;
    }
    if(existEmail.status != "active"){
        req.flash("error", "Tài khoản đang bị khóa");
        res.redirect('back');
        return ;
    }

    await Cart.updateOne({
        _id  : req.cookies.idCart,
    },{
        user_id : existEmail.id
    })
  

    res.cookie("tokenUser",existEmail.tokenUser);
    res.redirect("/");
}

module.exports.logout= async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("back");
}

module.exports.forgot= async (req, res) => {
    res.render("client/pages/user/forgot-password.pug",{
        pageTitle : "Quên mật khẩu"
    })
}

module.exports.forgotPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email : email,
        deleted : false
    })

    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect('back');
        return;
    }

    const otp = randomNum.generateRandomString(4) ;

    const objectForgotPassword = {
        email : email,
        otp : otp,
        expireAt : Date.now() + 5*60*1000,
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    const subject = "Cấp lại mật khẩu";
    const  text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. Mã OTP có hiệu lực trong vòng 3 phút. Vui lòng không cung cấp mã OTP này với bất kỳ ai.` ;
    SendEmail.sendEmail(email,subject,text);
    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otp = async (req, res) => {
    res.render("client/pages/user/otp-password.pug",{
        pageTitle : "Xác nhận mã",
        email : req.query.email
    })
}

module.exports.otpPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const checkOtp = await ForgotPassword.findOne({
        email : email,
        otp: otp
    })
    
    if(!checkOtp){
        req.flash("error", "Mã xác thực không đúng!");
        res.redirect('back');
        return;
    }

    const user = await User.findOne({
        email : email,
        deleted : false
    })

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
}

module.exports.reset = async (req, res) => {
    res.render("client/pages/user/reset-password.pug",{
        pageTitle : "Xác nhận mật khẩu"
    })
}

module.exports.resetPost = async (req, res) => {
    const tokenUser = req.cookies.tokenUser ;
    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(newPassword != confirmPassword){
        req.flash("error", "Mật khẩu không khớp");
        res.redirect("back"); return;
    }
    const user = await User.findOne({
        tokenUser : tokenUser
    })


    await User.updateOne({
        tokenUser : tokenUser
    },{
        password : md5( newPassword)
    })

    await ForgotPassword.deleteOne({
        email : user.email
    })
   
    req.flash("success", "Đổi mật khẩu thành công!");
    res.redirect("/");
}

module.exports.infor = async (req, res) => {
    const user = await User.findOne({
        tokenUser : req.cookies.tokenUser,
        deleted : false
    }).select("-password");
 
    res.render("client/pages/user/infor.pug",{
        pageTitle : "Thông tin tài khoản",
        infoUser : user 
    })
}


