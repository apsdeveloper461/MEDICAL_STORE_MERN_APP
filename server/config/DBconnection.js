// using mongoose for connection
const mongoose = require("mongoose")



const DBconnection=async()=>{
    try {
        const dbURL = `${process.env.NODE_DBCONNECTION_URL}/${process.env.NODE_DB_NAME}`;
        
        await mongoose.connect(dbURL);

        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Connected to MongoDB successfully");
        });
        connection.on('error', (error) => {
            console.error("Error occurred: " + error);
        });
    } catch (error) {
        console.error("error",process.env.NODE_DBCONNECTION_URL);
        
    }

}


module.exports=DBconnection