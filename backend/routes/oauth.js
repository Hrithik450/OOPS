const express = require("express");
const passport = require("passport");
const { SignUpSuccess } = require("../controllers/oauth");

const router = express.Router();

//Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/signup",
  }),
  SignUpSuccess
);

//Apple
// router.get("/apple", passport.authenticate("apple"));

// router.post(
//   "/apple/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/signup",
//   }),
//   SignUpSuccess
// );

module.exports = router;
