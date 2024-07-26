const mongoose = require("mongoose") ;
var slug = require('mongoose-slug-updater');

mongoose.plugin(slug);  
const productSchema = new mongoose.Schema ({
    title: String,
    products_category_id : String,
    slug: { type: String, slug: "title" , unique : true},
    description: String,
    price : Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type : Boolean,
        default : false
    },
    deletedAt: Date,
    deletedBy: String,
    createdBy: String,
    updatedBy: String,
    featured : {
        type : String,
        default : "0"
    }
})
const Product = mongoose.model("Product",productSchema, "products") ;

module.exports = Product ;