const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  pdfURl: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  tags: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
  },
  sku: {
    type: String,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
  },
  reviews: [
    {
      rating: Number,
      date: {
        type: Date,
        default: Date.now(),
      },
      reviewerName: String,
      reviewerEmail: String,
    },
  ],
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    barcode: String,
    qrCode: String,
  },
  thumbnail: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

const product = mongoose.model("product", ProductSchema);

module.exports = product;
