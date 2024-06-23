const { productModel } = require("../models/productModel")

const getAllProduct=async(req,res)=>{
    try {
        const getProduct=await productModel.find().select({
            name: 1,
            price: 2,
            category: 3,
            created: {
                $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$createdAt"
                }
            },
            updated: {
                $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$updatedAt"
                }
            }
        })
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