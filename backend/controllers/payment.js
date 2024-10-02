const { CatchAsyncError } = require("../middlewares/AsyncError");
const Razorpay = require("razorpay");
const ErrorHandler = require("../utils/Error");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const Checkout = CatchAsyncError(async (req, res, next) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "#receopy",
    payment_capture: 1,
  };

  const order = await instance.orders.create(options);

  return res.status(200).json({ order });
});

const verifyPayment = async (req, res) => {
  console.log("camed");
  const { paymentid } = req.params;

  console.log(paymentid);

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const payment = await instance.payments.fetch(paymentid);

  if (!payment) return next(new ErrorHandler("Razorpay error", 500));

  return res.status(200).json({ payment });
};

module.exports = {
  Checkout,
  verifyPayment,
};
