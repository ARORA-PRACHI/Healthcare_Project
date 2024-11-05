// const express = require('express');
// const router = express.Router();
// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcrypt');
// const User = require('../models/userModel'); // Adjust the path based on your structure

// // POST /api/register - Register a new user
// router.post('/register', asyncHandler(async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;

//     // Check if all required fields are provided
//     if (!firstName || !lastName || !email || !password) {
//         return res.status(400).json({ message: 'Please provide all required fields!' });
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         return res.status(400).json({ message: 'User already exists with this email!' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword
//     });

//     // Respond with the user's information, excluding the password
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

// // GET /api/users - Get all registered users (for testing purposes)
// router.get('/users', asyncHandler(async (req, res) => {
//     const users = await User.find({}, '-password'); // Exclude password from the result
//     res.status(200).json(users);
// }));

// module.exports = router;





const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, age, gender, bloodGroup, email, phoneNumber, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !age || !gender || !bloodGroup || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
        firstName,
        lastName,
        age,
        gender,
        bloodGroup,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, loginUser };