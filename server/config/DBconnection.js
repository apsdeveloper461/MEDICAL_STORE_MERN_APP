// using mongoose for connection
const mongoose = require("mongoose")



const DBconnection=async()=>{
    try {
        await mongoose.connect(process.env.NODE_DBCONNECTION_URL)
       const connection=mongoose.connection
       connection.on('connected',()=>{
        console.log("Connect to MOngo DB Successfully");
       })
       connection.on('error',(error)=>{
        console.error("Error occur which is "+ error)
       })
        
    } catch (error) {
        console.error(process.env.NODE_DBCONNECTION_URL);
        
    }

}


module.exports=DBconnection