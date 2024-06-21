const { stockHistoryModel } = require("../models/StockHistoryModel");

const logHistory = async (productId, change, operationType, resultingQuantity) => {
     const historyDoc = new stockHistoryModel({
     productId,
     change,
     operationType,
     resultingQuantity
     });
     return await historyDoc.save();
    //  console.log('History logged:', historyDoc);
    };


module.exports=logHistory