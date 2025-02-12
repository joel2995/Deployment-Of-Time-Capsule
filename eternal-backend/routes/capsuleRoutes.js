const express = require("express");
const multer = require("multer");
const { createCapsule, viewPublicCapsules, viewPrivateCapsule } = require("../controllers/capsuleController");
const Capsule = require("../models/Capsule");
const router = express.Router();

// Configure Multer storage (files will be saved to the "uploads" folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        // Prepend timestamp to avoid conflicts
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Capsule Creation Route with file upload support
router.post("/create", upload.any(), createCapsule);

// Route to view public capsules
router.get("/public", async (req, res) => {
    try {
        // Debug log: Request received for public capsules
        console.log("Fetching public capsules");
        await viewPublicCapsules(req, res);
    } catch (err) {
        console.error("Error in /public route:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Route to view private capsule (shared & non-shared)
// Ensure the payload from client contains the correct properties (e.g., email, uniqueCode)
router.post("/private", async (req, res) => {
    try {
        const { email, uniqueCode } = req.body;
        
        if (!email || !uniqueCode) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and access code are required" 
            });
        }

        // Find the private capsule
        const capsule = await Capsule.findOne({ 
            uniqueCode,
            type: 'private',
            allowedUsers: { $in: [email] }
        });

        if (!capsule) {
            return res.status(403).json({ 
                success: false, 
                message: "Invalid access code or unauthorized email" 
            });
        }

        res.json({ success: true, capsule });

    } catch (err) {
        console.error("Error accessing private capsule:", err);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
});

// New route to get capsules by creator (userId)
router.get("/usercapsules/:userId", async (req, res) => {
    try {
        const capsules = await Capsule.find({ creator: req.params.userId });
        res.status(200).json({ success: true, capsules });
    } catch (err) {
        console.error("Error retrieving specimens for userId " + req.params.userId + ":", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// New route to get capsule details by capsule id
router.get("/:capsuleId", async (req, res) => {
    try {
        console.log("Fetching capsule with id:", req.params.capsuleId);
        const capsule = await Capsule.findById(req.params.capsuleId);
        if (!capsule) {
            console.warn("Capsule not found for id:", req.params.capsuleId);
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }
        res.status(200).json({ success: true, capsule });
    } catch (err) {
        console.error("Error retrieving capsule by id:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// New route to delete a capsule by capsule id
router.delete("/:capsuleId", async (req, res) => {
    try {
        console.log("Deleting capsule with id:", req.params.capsuleId);
        const capsule = await Capsule.findByIdAndDelete(req.params.capsuleId);
        if (!capsule) {
            console.warn("Capsule not found for id:", req.params.capsuleId);
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }
        res.status(200).json({ success: true, message: "Capsule deleted successfully" });
    } catch (err) {
        console.error("Error deleting capsule by id:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// New route to edit a capsule by capsule id
router.put("/:capsuleId", upload.any(), async (req, res) => {
    try {
        console.log("Editing capsule with id:", req.params.capsuleId);
        const updates = req.body;
        const capsule = await Capsule.findByIdAndUpdate(req.params.capsuleId, updates, { new: true });
        if (!capsule) {
            console.warn("Capsule not found for id:", req.params.capsuleId);
            return res.status(404).json({ success: false, message: "Capsule not found" });
        }
        res.status(200).json({ success: true, capsule });
    } catch (err) {
        console.error("Error editing capsule by id:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
