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
 app.use(cors( {
    // origin:"https://medical-store-mern-app.vercel.app",
    credentials:true
 }))
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

//  //listen
const log=async()=>{
   
    // const data = await stockHistoryModel.aggregate([
    //     {
    //       $lookup: {
    //         from: "aps_products",
    //         localField: "productId",
    //         foreignField: "_id",
    //         as: "product_data"
    //       }
    //     },
    //     {
    //       $unwind: "$product_data"
    //     },
    //     {
    //       $match: {
    //         $expr: {
    //           $eq: [{ $dayOfYear: "$timestamp" }, { $dayOfYear: new Date() }]
    //         }
    //       }
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         timestamp: {
    //           $dateToString: {
    //             date: "$timestamp",
    //             format: "%H:%M:%S"
    //           }
    //         },
    //         product_data: 1
    //       }
    //     }
    //   ])
      
      

    // console.log(data);
  
}

log()

 DBconnection().then(()=>{
    app.listen(PORT,()=>{
    console.log("server running at "+PORT);
 })
})
