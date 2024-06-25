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
    try {
        const { year, month } = req.body;
        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 1)
        const SALE = await stockHistoryModel.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate, $lt: endDate },
                    change: { $lt: 0 }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$timestamp" }, // group by day of month
                    sales: {
                        $sum: "$sales"
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        console.log(SALE);
        const BUY = await stockHistoryModel.aggregate([
            {
                $match: {
                    timestamp: { $gte: startDate, $lt: endDate },
                    change: { $gt: 0 }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$timestamp" }, // group by day of month
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


const ProductSalesDetail = async (req, res) => {
    console.log("Dashboard");
    try {
        const products = await productModel.find();
        const productCount = products.length


        const today = new Date();
        const today_string = today.toISOString().slice(0, 10); // YYYY-MM-DD
        const currentMonth = today.getMonth(); // get the current month (0-11)
        const currentYear = today.getFullYear(); // get the current year

        const todaySales = await stockHistoryModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $dateToString: { date: "$timestamp", format: "%Y-%m-%d" } }, today_string]
                    },
                    change: { $lt: 0 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$sales" }
                }
            }
        ]);
        // console.log(todaySales)  
        const MonthlySale = await stockHistoryModel.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$timestamp" }, currentMonth],
                        $eq: [{ $year: "$timestamp" }, currentYear]
                    },
                    change: { $lt: 0 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$sales" }
                }
            }
        ]);
   const data = await stockHistoryModel.aggregate([
        {
          $lookup: {
            from: "aps_products",
            localField: "productId",
            foreignField: "_id",
            as: "product_data"
          }
        },
        {
          $unwind: "$product_data"
        },
        {
          $match: {
            $expr: {
              $eq: [{ $dayOfYear: "$timestamp" }, { $dayOfYear: new Date() }]
            }
          }
        },
        {
          $project: {
            _id: "$_id",
            change:'$change',
            sales:"$sales",
            timestamp: {
              $dateToString: {
                date: "$timestamp",
                format: "%Y-%m-%d %H:%M:%S"
              }
            },
            product_data: 1
          }
        }
      ])
      console.log(data);
        // console.log(Sales);
        return res.status(200).json({
            error: false,
            productCount: productCount,
            monthlySale: MonthlySale,
            todaySale: todaySales,
            todaySalesDetail:data

        })
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
    SaleGraph,
    ProductSalesDetail
}