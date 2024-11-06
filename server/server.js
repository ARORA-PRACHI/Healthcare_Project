const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(errorHandler);

// Set up multer storage configuration before using upload middleware in routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Handlebars setup
const hbs = require('hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.set('view engine', 'hbs');

// Routes
app.use('/api/register', require("./routes/userRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("working");
});

app.get('/home', (req, res) => {
    res.render("home", {
        title: "Dynamic Home Page",
        message: "Welcome to the dynamic home page!",
        user: {
            name: "John Doe",
            age: 30
        }
    });
});

app.get('/allusers', (req, res) => {
    const users = [
        { name: "John Doe", age: 30, email: "johndoe@example.com", role: "Admin" },
        { name: "Jane Smith", age: 25, email: "janesmith@example.com", role: "User" },
        { name: "Alice Johnson", age: 28, email: "alicejohnson@example.com", role: "Moderator" }
    ];
    res.render('users', { users });
});

// File upload route
app.post('/profile', upload.single('avatar'), function(req, res, next) {
    if (!req.file) {
        return res.status(400).send("No File Uploaded");
    }
    console.log(req.body);
    console.log(req.file);
    const fileName = req.file.filename;
    const imageUrl = `/uploads/${fileName}`;

    res.render("home", { imageUrl: imageUrl });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
