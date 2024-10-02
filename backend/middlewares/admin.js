const ErrorHandler = require("../utils/Error");
const user = require("../models/user");

const Admin = (roles) => {
  return async (req, res, next) => {
    const User = await user.findById(req.user.id);

    if (!User || !User.role)
      return next(new ErrorHandler("You are not Authorized", 400));

    if (!roles.includes(User.role))
      return next(new ErrorHandler("Access Denied", 403));

    next();
  };
};

module.exports = {
  Admin,
};
