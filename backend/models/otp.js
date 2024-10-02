const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  MobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;
