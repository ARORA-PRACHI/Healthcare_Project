// const express = require('express');
// const router = express.Router();
// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel'); 


// // POST /api/register - Register a new user
// router.post('/register', asyncHandler(async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({ message: 'Please provide all required fields!' });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ message: 'User already exists with this email!' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword
//     });

//     res.status(201).json({
//         message: 'User registered successfully!',
//         user: {
//             id: user._id,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email
//         }
//     });
// }));

// // GET /api/users - Get all registered users
// router.get('/users', asyncHandler(async (req, res) => {
//     const users = await User.find({}, '-password');
//     res.status(200).json(users);
// }));

// module.exports = router;


// routes/userRoutes.js



const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

module.exports = router;
