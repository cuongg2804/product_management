const Account = require("../../models/accounts.model");
const config = require("../../config/system");
const Roles = require("../../models/role.model");
module.exports.requireAuth =  async (req,res,next) => {
    if(!req.cookies.token){
        res.redirect(`/${config.prefixAdmin}/auth/login`);
        return;
    }
    const user = await Account.findOne({
        token: req.cookies.token,
        deleted : false,
        status : "active"
    })

    if(!user){
        res.clearCookie("token");
        res.redirect(`/${config.prefixAdmin}/auth/login`);
        return;
    }
    const roles = await Roles.findOne({
        _id : user.role_id,
        deleted: false
    })

    res.locals.roles = roles ;
    res.locals.user = user ;
    next();
   
};