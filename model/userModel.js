const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    ip: { type: String, unique: true },
    country: { type: String },
    visitCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
