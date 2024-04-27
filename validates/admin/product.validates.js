module.exports.validateProduct = (req,res,next) => {
    if(!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề");
        res.redirect("back");
        return ;
    }
    if(req.body.title.length < 5) {
        req.flash("error", "Vui lòng nhập lớn hơn 5 kí tự");
        res.redirect("back");
        return ;
    }
    next() ;
}