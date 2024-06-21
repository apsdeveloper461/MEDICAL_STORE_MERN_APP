const { default: mongoose } = require("mongoose");

const stockhistorySchema=new mongoose.Schema({
    timestamp: { type: Date, default: 
        Date.now },
         productId: { type: 
        mongoose.Schema.Types.ObjectId, ref: 
        'aps_product' },
        operationType:String,
         change: Number, // Positive for addition,negative for subtraction operationType: String,
         resultingQuantity: Number
         
})
exports.stockHistoryModel = 
    mongoose.model('aps_stock_history',stockhistorySchema);