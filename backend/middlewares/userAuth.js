const jwt = require("jsonwebtoken");
const user = require("../models/user");
const ErrorHandler = require("../utils/Error");
const { CatchAsyncError } = require("./AsyncError");

const Authentication = CatchAsyncError(async (req, res, next) => {
  const { uid } = req.cookies;
  req.user = null;

  if (!uid) {
    return next();
  }
  const { id } = jwt.verify(uid, process.env.JWTSECRET);
  const User = await user.findOne({ _id: id });

  if (!User) {
    return next();
  }

  req.user = User;
  console.log(req.user);
  next();
});

const verifyToken = CatchAsyncError(async (req, res, next) => {
  const token = await req.cookies?.SID; //type Error and //undefined error

  if (!token) return next(new ErrorHandler("You are not Authorized", 404));

  jwt.verify(String(token), process.env.JWTSECRET, async (err, User) => {
    if (err) {
      return next(new ErrorHandler("Invalid Token", 400));
    }

    req.user = User;
  });
  next();
});

const RefreshToken = CatchAsyncError(async (req, res, next) => {
  const prevtoken = await req.cookies?.SID;

  if (!prevtoken) {
    return next(new ErrorHandler("token not found!!", 404));
  }

  jwt.verify(prevtoken, process.env.JWTSECRET, (err, User) => {
    if (err) {
      return next(new ErrorHandler("Invalid Token!! ", 400));
    }

    res.clearCookie(`SID`);
    req.cookies[`SID`] = "";

    const token = jwt.sign(
      {
        id: User.id,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "7d",
      }
    );

    req.user = User;

    res.cookie(String(`${User.id}`), token, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  });

  next();
});

module.exports = {
  Authentication,
  verifyToken,
  RefreshToken,
};
