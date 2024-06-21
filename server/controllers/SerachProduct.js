const { productModel } = require("../models/productModel")

const getAllProduct=async(req,res)=>{
    try {
        const getProduct=await productModel.find()
        return res.status(200).json({
            product:getProduct,
            error:false
        })
    } catch (error) {
        return res.status(400).json({
            message:error,
            error:true
        })
    }
}


module.exports={getAllProduct
}