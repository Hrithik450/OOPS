const mongoose = require("mongoose");

const twoFactorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  tempSecret: String,
  secret: String,
  is2FAEnabled: {
    type: Boolean,
    default: false,
  },
});

const TwoFA = mongoose.model("TwoFA", twoFactorSchema);

module.exports = TwoFA;
