const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // googleId: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // status: { type: String, default: "offline" }, // e.g., "online", "offline", etc.
});

const User = mongoose.model("User", userSchema);

module.exports = User;
