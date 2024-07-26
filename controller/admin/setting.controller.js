const Settings = require("../../models/setting.models");


module.exports.index = async (req,res) => {
    const settingsGeneral = await Settings.findOne({});
    res.render("admin/pages/setting/general.pug",{
        pageTitle: "Cài đặt chung",
        settingsGeneral : settingsGeneral
    })
}

module.exports.indexPatch = async (req,res) => {
    const exist = await Settings.findOne({});
    if(exist){
        await Settings.updateOne({
            _id : exist.id
        },req.body)
    }
    else{
        const record =  new Settings(req.body);
        await record.save();
    }
    req.flash("success","Cập nhật thành công");
    res.redirect('back');
}