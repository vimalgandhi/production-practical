const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    
category_name : {
    type : String,
},

product_name : {
    type: String
},  
product_barcode : {
    type: Number
},
product_sku : {
    type: String
},
product_color : {
    type: String
},
product_size : {
    type: String
},  
product_price : {
    type: Number
}
},{
    timestamps: true
    });

const ProductModel = mongoose.model("tbl_products", productSchema);
module.exports = ProductModel
