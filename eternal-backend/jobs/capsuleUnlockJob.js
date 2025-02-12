const Capsule = require("../models/Capsule");
const User = require("../models/User");
const { sendCapsuleUnlockNotification } = require("../services/emailService");
const moment = require("moment");

const checkCapsuleUnlocks = async () => {
    try {
        const today = moment().startOf("day").toDate();
        const capsules = await Capsule.find({ dateOfOpening: today });

        for (const capsule of capsules) {
            const creator = await User.findById(capsule.creator);
            if (creator) {
                await sendCapsuleUnlockNotification(creator.email, capsule);
            }

            // Notify shared users (private capsules)
            if (capsule.isShared && capsule.allowedUsers.length > 0) {
                for (const email of capsule.allowedUsers) {
                    await sendCapsuleUnlockNotification(email, capsule);
                }
            }
        }
    } catch (error) {
        console.error("Error in capsule unlock job:", error);
    }
};

module.exports = checkCapsuleUnlocks;
