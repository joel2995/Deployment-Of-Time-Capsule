const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require("../models/User");
const sendOtp = require("../utils/sendOtp");

// 🔹 Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Remove duplicate checks since we now allow duplicates
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            tcCoins: 100, // Initial TC Coins balance
            isVerified: true // Set to true by default since we removed OTP
        });
        
        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
         console.error('Registration error:', err); // Add
        res.status(500).json({ message: "Server Error" });
    }
};

// 🔹 Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "Please provide both email and password" 
            });
        }

        // Find first matching user since we allow duplicates
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "User not found" 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                username: user.username,
                tcCoins: user.tcCoins
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                tcCoins: user.tcCoins,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Server Error",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// 🔹 Create Admin
exports.createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check both email and username
        const adminExists = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (adminExists) {
            return res.status(400).json({ 
                message: adminExists.email === email ? 
                    "Email already exists" : 
                    "Username already taken" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new User({ 
            username,
            email, 
            password: hashedPassword, 
            isVerified: true, 
            role: "admin",
            tcCoins: 1000 // Admins get more initial TC Coins
        });

        await newAdmin.save();
        res.status(200).json({ message: "Admin account created" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 🔹 Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format"
            });
        }

        const user = await User.findById(userId)
            .select('-password -otp -__v');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                tcCoins: user.tcCoins,
                role: user.role,
                isVerified: user.isVerified
            }
        });
    } catch (err) {
        // console.error('Profile fetch error:', err); // Add logging
        res.status(500).json({
            success: false,
            message: "Error fetching profile",
            error: err.message
        });
    }
};

// 🔹 Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username } = req.body;

        if (username) {
            const usernameExists = await User.findOne({
                _id: { $ne: userId },
                username
            });

            if (usernameExists) {
                return res.status(400).json({
                    success: false,
                    message: "Username already taken"
                });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { username } },
            { new: true }
        ).select('-password -otp');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: err.message
        });
    }
};
