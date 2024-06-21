const { productModel } = require("../models/productModel")

const getAlllogHistory=async(req,res)=>{
    try {
        const getAllHistory=await productModel.find()
        return res.status(200).json({
            log:getAllHistory,
            error:false
        })
    } catch (error) {
        return res.status(400).json({
            message:error,
            error:true
        })
    }   
}


//history of Custom product by using product_id

const getCustomProductHistory=async(req,res)=>{
    try {
        const {product_id}=req.body
        const getHistory=await productModel.find({productId:product_id})
        return res.status(200).json({
            log:getHistory,
            error:false
        })
    } catch (error) {
        return res.status(400).json({
            message:error,
            error:true
        })
    }
}


module.exports={
    getAlllogHistory,
    getCustomProductHistory
}