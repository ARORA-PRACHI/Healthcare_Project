//Frame configuration

const express=require("express");                              //nodejs framework
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middleware/errorHandler");      // various purposes authorization,error handling,request handling
const cors=require("cors");                                   // identity verification for security purposes
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
const userRoutes = require('./routes/userRoutes'); 
const dotenv = require("dotenv");
//env file handling
const dotenv=require("dotenv");                                //manage environment variable
dotenv.config();                                               //enabling env file

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};


connectDb();
const app=express();
const port=process.env.PORT || 5000;                         

app.use(express.json());
app.use(cors());

//error handling middleware
app.use(errorHandler);

//routes below
app.get('/',(req,res)=>{
    res.send("Working");
})


app.get("/home",(req,res)=>{
    res.render("home",{})
})

app.get("/users",(req,res)=>{
    res.render("users",{})
})
//app config start
app.listen(port, ()=>{
    console.log(`Server running on port http://localhost:${port}`);
});

app.set('view engine','hbs');   // to set Handlebars (hbs) as the templating engine for rendering views.    
//npm run dev automatic restarts when you make changes to your code.