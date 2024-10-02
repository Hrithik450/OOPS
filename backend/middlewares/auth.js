const { check, validationResult } = require("express-validator");

// const validate = (req, res, next) => {

// };

const checkIsEmpty = () => [
  check("username")
    .not()
    .isEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 4 })
    .withMessage(`username should be more than 4 chracters`),
  check("email", "please enter a valid email").isEmail(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("please create a password")
    .isLength({ min: 8 })
    .withMessage(`password should be min 8 chracters`),
];

const checkIsEmptyInLogin = () => [
  check("email", "please enter a valid email").isEmail(),
  check("password", "please enter a password").not().isEmpty(),
];

const checkIsEmptyEmail = () => [
  check("email", "please enter a valid email").isEmail(),
];

const checkIsEmptyPassword = () => [
  check("newPassword", "password cannot be empty").not().isEmpty(),
  check("ConfirmPassword", "please re-enter your password").not().isEmpty(),
];

module.exports = {
  checkIsEmpty,
  checkIsEmptyInLogin,
  checkIsEmptyEmail,
  checkIsEmptyPassword,
};
