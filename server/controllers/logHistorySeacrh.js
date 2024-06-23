const { stockHistoryModel } = require("../models/StockHistoryModel")

const getAlllogHistory = async (req, res) => {
    try {
        const getAllHistory = await stockHistoryModel.find().select({
            change: 1,
            operationType: 2,
            resultingQuantity: 3,
            createdAt: {
                $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$timestamp"
                }
            }
        }).populate('productId')
        console.log(getAllHistory);
        return res.status(200).json({
            log: getAllHistory,
            error: false
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
            error: true
        })
    }
}


//history of Custom product by using product_id

const getCustomProductHistory = async (req, res) => {
    try {
        const { product_id } = req.body
        const getHistory = await stockHistoryModel.find({ productId: product_id }).select({
            change: 1,
            operationType: 2,
            resultingQuantity: 3,
            createdAt: {
                $dateToString: {
                    format: "%Y-%m-%d %H:%M:%S",
                    date: "$timestamp"
                }
            }
        }).populate('productId')
        return res.status(200).json({
            log: getHistory,
            error: false
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
            error: true
        })
    }
}


module.exports = {
    getAlllogHistory,
    getCustomProductHistory
}