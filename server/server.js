//Frame configuration

const express=require("express");
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");
const cors=require("cors");


connectDb();
const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//error handling middleware
app.use(errorHandler);

//routes below
app.get('/',(req,res)=>{
    res.send("working");
})

//app config start
app.listen(port,()=>{
    console.log('Server running on port http://localhost:${port}');
})