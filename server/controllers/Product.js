
const { productModel } = require("../models/productModel");
const logHistory = require("./logStockHistory");

const newproduct=async(req,res)=>{
   try {
       const {name,stock,category,price}=req.body;
       const findProductWithName=await productModel.findOne({name})
       
       if(findProductWithName){
           console.log(findProductWithName,Boolean(findProductWithName))
           throw "Already Product Available"
        }
        
        // console.log(findProductWithName,Boolean(findProductWithName))
    //adding new product
    // console.log("hello");
    const newPro=new productModel({
        name,
        stock,
        category,
        price
    })

    const product=await newPro.save()
    await logHistory(product._id,product.stock*product.price,product.stock,'At Starting Stock',product.stock)
    return res.status(200).json({
        error:false,
        Product:product,
        message:"Add Product Successfully"
    })

   } catch (error) {
   return res.status(400).json({
        error:true,
        message:error?.message||error
    })
    
   }
}
//update Product
const updateProduct=async(req,res)=>{
    try {
     const {product_id,name,category,price}=req.body;
     //adding new product
     console.log("hello");
     const findProduct= await  productModel.updateOne({_id:product_id},{
         name,category,price
     })
     console.log(findProduct);
     return res.status(200).json({
         error:false,
         message:"Update Product Successfully"
     })
 
    } catch (error) {
     return res.status(400).json({
         error:true,
         message:error?.message||error
     })
     
    }
 }
 
 
module.exports= {
    newproduct,
    updateProduct
}