const { stockHistoryModel } = require("../models/StockHistoryModel");

const logHistory = async (productId,sales, change, operationType, resultingQuantity) => {
     const historyDoc = new stockHistoryModel({
     productId,
     change,
     sales,
     operationType,
     resultingQuantity
     });
     return await historyDoc.save();
    //  console.log('History logged:', historyDoc);
    };


module.exports=logHistory