const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },  // Removed unique: true
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    tcCoins: { type: Number, default: 100 }
});

module.exports = mongoose.model("User", UserSchema);
