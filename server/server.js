// const express = require("express");
// const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const hbs = require("hbs");
// const userRoutes = require('./routes/userRoutes');

// dotenv.config();
// connectDb();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());
// app.use(errorHandler);
//  // Route for user routes

// app.use('/api',userRoutes);
// app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname + '/views/partials');

// app.get('/', (req, res) => res.send("Working"));
// app.get("/home", (req, res) => res.render("home", {}));
// app.get("/users", (req, res) => res.render("users", {}));

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


//FRAMEWORK CONFIGURATION
const express = require('express');
const connectDb=require("./config/dbConnection");
const errorHandler=require("./middlewares/errorHandler");
const cors=require("cors");
const hbs = require("hbs");
const path = require("path");

//env file configuration
const dotenv=require("dotenv");
dotenv.config();

connectDb();
const app= express();
app.set('view engine', 'hbs');
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("working");  
});

app.get('/home',(req,res)=>{
    res.render('home',{
        username: "Galaxy",
        posts: "flana dhimkana"
    })
})

app.get('/allusers',(req,res)=>{
    res.render('allusers',{
        data:[{name:"saksham", age:20},
            {name:"prachi", age:19}]
    })
})

app.use(errorHandler);

//register route
app.use("/api/register" , require("./routes/userRoutes"));

app.use("/api/registerDoctor", require("./routes/doctorsDetails"));



app.listen(port,() => {
    console.log(`Server running on port http://localhost:${port}`);
});