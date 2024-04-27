const product = require("../models/product.model");
module.exports =  (req,countRecord) => {
    const objectPagination  = {
        currentPage : 1,
        limitItem : 4
    }
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page) ;
    }
    objectPagination.skipItem = (objectPagination.currentPage - 1 )*objectPagination.limitItem;
    objectPagination.totalPage = Math.ceil(countRecord/objectPagination.limitItem); 
    return objectPagination ; 
}