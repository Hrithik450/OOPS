const express = require("express");
const {
  createNewUser,
  loginUser,
  Myprofile,
  Logout,
} = require("../controllers/user");
const { ForgotPassword, ResetPassword } = require("../controllers/PassReset");
const {
  checkIsEmpty,
  checkIsEmptyInLogin,
  checkIsEmptyEmail,
  checkIsEmptyPassword,
} = require("../middlewares/auth");
const {
  Authentication,
  verifyToken,
  RefreshToken,
} = require("../middlewares/userAuth");

const router = express.Router();

router.get("/", (req, res) => {
  return res.end("Hello World");
});
router.post("/signup", createNewUser);
router.post("/login", loginUser);
router.patch("/users/forgetpassword", checkIsEmptyEmail(), ForgotPassword);
router.post("/users/password/reset/:id", checkIsEmptyPassword(), ResetPassword);
router.get("/me", verifyToken, Myprofile);
router.get("/refresh", RefreshToken, verifyToken, Myprofile);
router.get("/logout", Logout);

module.exports = router;
