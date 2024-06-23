const { productModel } = require("../models/productModel");

const categoryCountGraphData = async (req, res) => {
    try {
        const categories = await productModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);
        return res.status(200).json({
            error: false,
            cateorygraph: categories
        })
    } catch (error) {
        return res.status(200).json({
            error: true,
            message: error?.message || error
        })

    }
}
const SalesBuyNoOfStockAccordingToDate = async (req, res) => {
    try {
        const salesStockData = await stockHistoryModel.aggregate([
            {
                $match: {
                    change: { $lt: 0 } // sales
                }
            },
            {
                $lookup: {
                    from: 'aps_products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $addFields: {
                    salesPrice: '$change'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                    totalSales: { $sum: '$salesPrice' }
                }
            }
        ]);
        const buyStockData = await stockHistoryModel.aggregate([
            {
                $match: {
                    change: { $gt: 0 } // buy
                }
            },
            {
                $lookup: {
                    from: 'aps_products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $addFields: {
                    buyPrice: '$change'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                    totalBuy: { $sum: '$buyPrice' }
                }
            }
        ]);
        return res.status(200).json({
            error: false,
            salesStock: salesStockData,
            buyStock: buyStockData
        })
    } catch (error) {
        return res.status(200).json({
            error: true,
            message: error?.message || error
        })
    }
}
const SalesGraph = async (req, res) => {
    try {
        const salesData = await stockHistoryModel.aggregate([
            {
                $match: {
                    change: { $lt: 0 } // sales
                }
            },
            {
                $lookup: {
                    from: 'aps_products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: '$product'
            },
            {
                $addFields: {
                    salesPrice: { $multiply: ['$change', '$product.price'] }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                    totalSales: { $sum: '$salesPrice' }
                }
            }
        ]);
        return res.status(200).json({
            error: false,
            sales: salesData
        })
    } catch (error) {
        return res.status(200).json({
            error: true,
            message: error?.message || error
        })
    }
}
module.exports = {
    categoryCountGraphData,
    SalesBuyNoOfStockAccordingToDate
}