const { CatchAsyncError } = require("../middlewares/AsyncError");
const product = require("../models/products");
const ErrorHandler = require("../utils/Error");
const book = require("../models/books");
const path = require("path");

const Getproducts = CatchAsyncError(async (req, res, next) => {
  const products = await book.find({});
  return res.status(200).json({ products });
});

const GetSingleProduct = CatchAsyncError(async (req, res, next) => {
  const Product = await book.findById(req.params.id);
  if (!Product) {
    return next(new ErrorHandler("No product found!!!", 404));
  } else {
    return res.status(200).json({ Product: Product });
  }
});

const updateRating = CatchAsyncError(async (req, res, next) => {
  const { value, username, email } = req.body;

  const Product = await book.findById(req.params.prdtId);
  if (!Product) return next(new ErrorHandler("No Product found!!!", 404));

  const newReview = {
    rating: value,
    reviewerName: username,
    reviewerEmail: email,
  };

  Product.reviews.push(newReview);

  const totalRating = Product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  Product.rating = totalRating / Product.reviews.length;

  await Product.save();

  return res.status(200).json({
    message: "Thank you for Rating",
    Product: Product,
  });
});

const DownloadPdf = CatchAsyncError(async (req, res, next) => {
  const { productId } = req.params;

  const Product = await book.findById(productId);
  if (!Product) return next(new ErrorHandler("Product Not found!!", 404));

  const filepath = path.join(__dirname, "..", "pdfs", Product.pdfurl);
  return res.status(200).download(filepath, (err) => {
    if (err) {
      console.log(err);
      next(new ErrorHandler("File Not found", 404));
    }
  });
});

const Pdfpath = CatchAsyncError(async (req, res, next) => {
  const filepath = path.join(__dirname, "..", "pdfs", "python.pdf");
  res.type("application/pdf");
  res.sendFile(filepath);
});

const feature = CatchAsyncError(async (req, res, next) => {
  console.log("yess");
  const products = await book.find({ trending: true });

  if (!products) return next(new ErrorHandler("Currently No Books", 404));

  return res.status(200).json({ products });
});

module.exports = {
  Getproducts,
  GetSingleProduct,
  updateRating,
  DownloadPdf,
  Pdfpath,
  feature,
};
