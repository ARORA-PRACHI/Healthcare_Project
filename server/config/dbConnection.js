const mongoose=require("mongoose");              //for connection

const connectDb=async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);     //.connect to connect
        console.log("Database Connected:",
            connect.connection.host,
            connect.connection.name
        );
    }catch(err){
        console.log(err);
        process.exit(1);     //1 is fail 0 is pass to exit the process 
    }
}

module.exports=connectDb;              // to export this