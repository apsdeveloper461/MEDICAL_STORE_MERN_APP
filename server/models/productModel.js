const { default: mongoose, Types } = require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type:String,
        required:true,
        default:'General'
    },
    price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

exports.productModel=new mongoose.model('aps_product',productSchema)