const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const CapsuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfCreation: { type: Date, default: Date.now },
    dateOfOpening: { type: Date, required: true },
    message: { type: String, required: true },
    media: [{ type: String }], // File URLs
    links: [{ type: String }],
    type: { type: String, enum: ["public", "private"], required: true },
    isShared: { type: Boolean, default: false },
    uniqueCode: { type: String, default: null }, // Only for shared private capsules
    viewCount: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    allowedUsers: [{ type: String }] // Email IDs of allowed users (for private capsules)
});

module.exports = mongoose.model("Capsule", CapsuleSchema);
