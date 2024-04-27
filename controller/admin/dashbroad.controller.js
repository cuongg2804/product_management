//[GET] /admin/dashbroad
const config = require("../../config/system");

module.exports.index = (req,res) => {
    res.render(`${config.prefixAdmin}/pages/dashbroad/index.pug`);
}