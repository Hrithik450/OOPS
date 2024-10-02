const { CatchAsyncError } = require("../middlewares/AsyncError");
const product = require("../models/products");
const user = require("../models/user");
const ErrorHandler = require("../utils/Error");
const book = require("../models/books");
const path = require("path");

const AdminDashboard = (req, res, next) => {
  return res.status(200).json({ message: "Access Granted" });
};

const CreateBook = CatchAsyncError(async (req, res, next) => {
  const options = req.body;

  const Book = await book.create({
    ...options,
  });

  return res.status(200).json({ message: "Successfully created" });
});

const UpdateBook = CatchAsyncError(async (req, res, next) => {
  const options = req.body;

  const Book = await book.findOneAndUpdate({ _id: options.id }, { ...options });

  if (!Book) return next(new ErrorHandler("Book doesn't exist", 404));

  return res.status(200).json({ message: "Successfully updated" });
});

const CreateProduct = CatchAsyncError(async (req, res, next) => {
  const options = req.body;

  const User = await product.create({
    ...options,
  });

  return res.status(200).json({ msg: "Successfully created", User });
});

const UpdateProduct = CatchAsyncError(async (req, res, next) => {
  const options = req.body;

  const Product = await product.findOneAndUpdate(
    { _id: req.params.id },
    {
      ...options,
    }
  );

  if (!Product) return next(new ErrorHandler("Product Not Exist! ", 404));

  return res
    .status(200)
    .json({ message: "Product Successfullt Updated", Product });
});

const DeleteBook = CatchAsyncError(async (req, res, next) => {
  const Book = await book.findById(req.body.id);

  if (!Book) return next(new ErrorHandler("Product Not got to Delete!!", 404));

  await book.deleteOne({ _id: req.body.id });

  return res.status(200).json({ message: "Product successfully deleted" });
});

const GetAllUsers = CatchAsyncError(async (req, res, next) => {
  const Users = await user.find({});

  if (!Users) return next(new ErrorHandler("No Users Exist!! ", 404));

  let userDetails = [];

  Users.forEach((user) => {
    userDetails.push({
      Name: user.username,
      email: user.email,
      role: user.role,
      joined: user.createdAt,
    });
  });

  return res.status(200).json({ userDetails });
});

const GetSingleUser = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const User = await user.findOne({ email });

  if (!User) return next(new ErrorHandler("No User found !!", 404));

  const UserObj = {
    Name: User.username,
    email: User.email,
    role: User.role,
    joined: User.createdAt,
  };

  return res.status(200).json({ UserObj });
});

const DeleteUser = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const User = await user.findOne({ email });

  if (!User) return next(new ErrorHandler("No User found to Delete", 404));

  await user.deleteOne({ email });

  return res.status(200).json({ message: "user successfully deleted" });
});

module.exports = {
  AdminDashboard,
  CreateProduct,
  CreateBook,
  UpdateProduct,
  DeleteBook,
  GetAllUsers,
  GetSingleUser,
  DeleteUser,
  UpdateBook,
};
