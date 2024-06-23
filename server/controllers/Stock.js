const { productModel } = require("../models/productModel");
const logHistory = require("./logStockHistory");

const addStock=async(req,res)=>{
    try {
        const {product_id,stock}=req.body;

        //add Quantity/stock in a store
        const findProduct=await productModel.findOne({_id:product_id})
        if(!findProduct)  throw "Product not Found"

        //if product found
        findProduct.stock += stock;
        const product=await findProduct.save();
        const log=await logHistory(findProduct._id, stock, 
        'Add Stock', findProduct.stock);

        return res.status(200).json({
            message:"Adding Stock Successfully",
            product:product,
            log:log,
            error:false
        })
        
    } catch (error) {
        
       return res.status(400).json({
            message: error?.messaege||error,
            error:true
        })
    }

}


//reomve stock function

const removeStock=async(req,res)=>{
    try {
        const {product_id,stock}=req.body;

        //add Quantity/stock in a store
        const findProduct=await productModel.findOne({_id:product_id})
        console.log(findProduct,"find Product");
        if(!findProduct)  throw "Product not Found"

        //if product found

        // if stock is greater than existing stock
        if(stock > findProduct.stock){
            console.log("gt ");
            throw "Unsuffficent Stock"
        }
        // and check here removing stock is less than equal existing stock
        findProduct.stock -= stock;
        const product=await findProduct.save();
        const log=await logHistory(findProduct._id, stock*-1, 
        'Remove Stock', findProduct.stock);

        return res.status(200).json({
            message:"Removing Stock Successfully",
            product:product,
            log:log,
            error:false
        })
        
    } catch (error) {
        
      return res.status(400).json({
            message: error.messaege||error,
            error:true
        })
    }
}



module.exports={
    addStock,
    removeStock
}