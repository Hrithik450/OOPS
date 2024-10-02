const express = require("express");
const { Checkout, verifyPayment } = require("../controllers/payment");

const router = express.Router();

router.post("/", Checkout);
router.get("/payment/:paymentid", verifyPayment);

module.exports = router;
