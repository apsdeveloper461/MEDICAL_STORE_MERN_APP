const { stockHistoryModel } = require("../models/StockHistoryModel");
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
        return res.status(400).json({
            error: true,
            message: error?.message || error
        })

    }
}
const ProductGraph = async (req, res) => {
    const { year } = req.body;
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    try {

        // Then, use them in your aggregate query:

        const data = await productModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            }
        ]);
        return res.status(200).json({
            error: false,
            productgraph: data
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error?.message || error
        })
    }
}
const SaleGraph = async (req, res) => {
    const { year } = req.body;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    try {
        const SALE = await stockHistoryModel.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate, $lt: endDate },
                    change: { $lt: 0 }
                }
            },
            {
                $group: {
                    _id: { $month: "$timestamp" },
                    sales: {
                        $sum: "$sales"
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        const BUY = await stockHistoryModel.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate, $lt: endDate },
                    change: { $gt: 0 }
                }
            },
            {
                $group: {
                    _id: { $month: "$timestamp" },
                    buy: {
                        $sum: "$sales"
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return res.status(200).json({
            "BUY": BUY,
            "SALE": SALE,
            error: false
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error?.message || error
        })
    }
}


module.exports = {
    categoryCountGraphData,
    ProductGraph,
    SaleGraph
}