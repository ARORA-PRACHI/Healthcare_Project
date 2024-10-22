//Frame configuration

const express=require("express");                              //nodejs framework
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");      // various purposes authorization,error handling,request handling
const cors=require("cors");                                   // identity verification for security purposes



//env file handling
const dotenv=require("dotenv");                                //manage environment variable
dotenv.config();                                               //enabling env file



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
app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
});