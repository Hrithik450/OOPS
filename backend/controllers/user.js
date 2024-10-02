const user = require("../models/user");
const oauth = require("../models/oauth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const VerifyEmail = require("../utils/verifyemail");
const ErrorHandler = require("../utils/Error");
const { CatchAsyncError } = require("../middlewares/AsyncError");

const createNewUser = CatchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashpassword = bcrypt.hashSync(password);
  const User = await user.create({
    username,
    email,
    password: hashpassword,
  });

  await User.save();

  const token = jwt.sign(
    {
      id: User._id,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );

  const Data = {
    username: User.username,
    email: User.email,
    verified: User.verified,
  };

  res.cookie("SID", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    Data,
    msg: "Successfully Registered",
  });

  // const VerifyUrl = `${req.protocol}://localhost:5173/verify/${token}`;
  // const html = `<p>Click <a href="${VerifyUrl}">here</a> to verify your email.</p>`;

  // try {
  //   await VerifyEmail({
  //     to: User.email,
  //     subject: "Email Verification link",
  //     html: html,
  //   });

  //   return res
  //     .status(200)
  //     .json({ msg: "email sent successfully", token: token });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(400).json({ msg: "email cannot be sent" });
  // }
});

const loginUser = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  let User;

  User = await user.findOne({ email });

  if (!User) return next(new ErrorHandler("User not found!!", 404));

  const isMatch = await bcrypt.compare(password, User.password);
  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 400));

  const token = jwt.sign(
    {
      id: User._id,
    },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );

  if (req.cookies[`SID`]) {
    req.cookies[`SID`] = "";
  }

  const Data = {
    username: User.username,
    email: User.email,
    verified: User.verified,
  };

  res.cookie("SID", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  req.userId = User._id.toString();

  return res.status(200).json({
    Data,
    message: "Successfully Logged In",
  });
});

const Myprofile = CatchAsyncError(async (req, res, next) => {
  if (!req.user)
    return next(new ErrorHandler("please Login Before going to profile ", 400));

  let User;

  User = await user.findById(req.user.id);

  if (!User) return next(new ErrorHandler("No User found!!", 404));

  const Data = {
    username: User.username,
    email: User.email,
    role: User.role,
    createdAt: User.createdAt,
  };

  return res.status(200).json({ Data });
});

const Logout = CatchAsyncError(async (req, res, next) => {
  const token = await req.cookies?.SID;
  // if (!Cookie) return next(new ErrorHandler("You're Not Authorized !!", 400));

  // const token = Cookie.split("=")[1];

  if (!token) return next(new ErrorHandler("Token Not found!! ", 404));

  jwt.verify(token, process.env.JWTSECRET, (err, User) => {
    if (err) {
      return next(new ErrorHandler("Invalid Token", 400));
    }
    res.clearCookie(`SID`);
    req.cookies[`SID`] = "";
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = {
  createNewUser,
  loginUser,
  Myprofile,
  Logout,
};
