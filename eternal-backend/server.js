const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const capsuleRoutes = require("./routes/capsuleRoutes");
const cron = require("node-cron");
const checkCapsuleUnlocks = require("./jobs/capsuleUnlockJob");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Scheduled Jobs
cron.schedule("0 0 * * *", () => {
    console.log("🔔 Checking for unlocked capsules...");
    checkCapsuleUnlocks();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/capsules", capsuleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});


app.get("/", (req, res) => {
    res.json({ message: "API is working" });
  });

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});


  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
