 const express=require('express')
 const app=express();
//config dotenv file
require('dotenv').config()
 
//  const router=require('./router/route')
 //using cors option
 const cors=require('cors');
const { configDotenv } = require('dotenv');
const DBconnection = require('./config/DBconnection');
const router = require('./router/route');
const { stockHistoryModel } = require('./models/StockHistoryModel');
const { productModel } = require('./models/productModel');

app.use(express.json())
 app.use(cors())
//  {
//     origin:process.env.NODE_FRONTEND_URL,
//     credentials:true
//  }
 //port 
 const PORT=process.env.NODE_PORT || 985


//route
app.get('/',(req,res)=>{
    res.status(400).json({
        message:'this is get request at medical website maked by Aps Developer'
    })
})

//routes
app.use('/store',router)

 //listen
// const log=async()=>{
   
//    console.log("SalesData",salesStockData);
  
// }
// log()

 DBconnection().then(()=>{
    app.listen(PORT,()=>{
    console.log("server running at "+PORT);
 })
})