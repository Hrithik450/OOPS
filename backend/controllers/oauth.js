require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: 3600000 });
};

const SignUpSuccess = (req, res) => {
  const token = generateToken(req.user);
  res.status(200).cookie("uid", token).redirect("http://localhost:5173/home");
};

module.exports = {
  SignUpSuccess,
};
