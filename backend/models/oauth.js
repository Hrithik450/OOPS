const mongoose = require("mongoose");

const oauthSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  imageSrc: {
    type: String,
  },
});

const oauth = mongoose.model("oauth", oauthSchema);

module.exports = oauth;
