const Capsule = require("../models/Capsule");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

// Create Capsule
exports.createCapsule = async (req, res) => {
    try {
        const { email, name, dateOfOpening, message, media, links, type, isShared, allowedUsers } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Public Capsule (Free to create)
        if (type === "public") {
            const capsule = new Capsule({
                name,
                dateOfOpening,
                message,
                media,
                links,
                type,
                creator: user._id,
            });
            await capsule.save();
            console.log(capsule);
            console.log("Capsule Over");
            return res.status(200).json({ message: "Public capsule created successfully", capsule });
        }

        // Private Capsule (Requires 20 TC Coins)
        if (type === "private") {
            if (user.tcCoins < 20) return res.status(400).json({ message: "Not enough TC Coins" });

            user.tcCoins -= 20; // Deduct 20 TC Coins
            await user.save();

            let uniqueCode = null;
            if (isShared) uniqueCode = uuidv4().slice(0, 8); // Generate 8-character unique code

            const capsule = new Capsule({
                name,
                dateOfOpening,
                message,
                media,
                links,
                type,
                isShared,
                uniqueCode,
                creator: user._id,
                allowedUsers: allowedUsers || [],
            });

            await capsule.save();
            return res.status(200).json({ message: "Private capsule created successfully", capsule });
        }

        return res.status(400).json({ message: "Invalid capsule type" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};




// View Public Capsules
exports.viewPublicCapsules = async (req, res) => {
    try {
        const capsules = await Capsule.find({ type: "public" });

        const today = moment().startOf("day");

        const filteredCapsules = capsules.map((capsule) => {
            const unlockDate = moment(capsule.dateOfOpening).startOf("day");

            if (today.isBefore(unlockDate)) {
                return {
                    _id: capsule._id,
                    name: capsule.name,
                    message: "Just wait, dear! You will be notified when your capsule reaches the unlock date.",
                    dateOfOpening: capsule.dateOfOpening,
                };
                
            } else {
                capsule.views += 1;

                // Reward creator for every 100 views
                if (capsule.views % 100 === 0) {
                    User.findById(capsule.creator).then((creator) => {
                        if (creator) {
                            creator.tcCoins += 10;
                            creator.save();
                        }
                    });
                }

                capsule.save();
                return capsule;
            }
        });

        res.status(200).json({ message: "Public capsules retrieved successfully", capsules: filteredCapsules });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// View Private Capsules
exports.viewPrivateCapsule = async (req, res) => {
    try {
        const { email, uniqueCode } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        let capsule;
        if (uniqueCode) {
            // Find shared private capsule
            capsule = await Capsule.findOne({ uniqueCode, type: "private", isShared: true });
            if (!capsule) return res.status(404).json({ message: "Invalid or non-existent capsule code" });

            // Check if the user has access
            if (!capsule.allowedUsers.includes(email)) {
                if (user.tcCoins < 25) return res.status(400).json({ message: "Not enough TC Coins" });

                user.tcCoins -= 25;
                capsule.allowedUsers.push(email);
                await capsule.save();
                await user.save();
            }
        } else {
            // Find non-shared private capsule assigned to the user
            capsule = await Capsule.findOne({ type: "private", isShared: false, allowedUsers: email });
            if (!capsule) return res.status(404).json({ message: "No private capsule found for this user" });
        }

        const today = moment().startOf("day");
        const unlockDate = moment(capsule.dateOfOpening).startOf("day");

        if (today.isBefore(unlockDate)) {
            return res.status(403).json({
                message: "Just wait, dear! You will be notified when your capsule reaches the unlock date."
            });
        }

        res.status(200).json({ message: "Capsule retrieved successfully", capsule });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteCapsule = async (req, res) => {
    try {
        const { email, capsuleId } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const capsule = await Capsule.findById(capsuleId);
        if (!capsule) return res.status(404).json({ message: "Capsule not found" });

        if (capsule.creator.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this capsule" });
        }

        await Capsule.findByIdAndDelete(capsuleId);
        res.status(200).json({ message: "Capsule deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
