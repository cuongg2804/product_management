const dashBroad = require("./dashbroad.router") ;
const systemConfig = require("../../config/system");
const Product = require("./product.router");
const Bin = require("./bin.router");

module.exports = (app) => {
    const Admin_Path = `${systemConfig.prefixAdmin}`;
    app.use("/" + Admin_Path + "/dashboard",dashBroad);
    
    app.use("/" + Admin_Path + "/products", Product);
    
    app.use("/" + Admin_Path + "/bins", Bin);
}