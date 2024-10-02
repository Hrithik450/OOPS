const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title of book is required"],
  },

  author: {
    type: String,
    required: [true, "Author of book is required"],
  },

  category: {
    type: String,
    required: [true, "category cannot be empty"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "year is mandatory"],
    min: [1000, "Year must be a valid year"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  edition: {
    type: Number,
    required: [true, "Edition cannot be empty"],
    min: [1, "Edition must be at least 1"],
  },
  language: {
    type: String,
    default: "en",
  },
  extension: {
    type: String,
    default: "pdf",
  },
  pages: {
    type: Number,
    required: [true, "pages of the book is required"],
    min: [1, "Pages must be at least 1"],
  },

  pdfurl: {
    type: String,
    required: [true, "url cannot be empty"],
    trim: true,
  },
  description: {
    type: String,
  },
  coverImage: {
    type: String,
    required: [true, "cover of the book is required"],
    trim: true,
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
  },
  MoneyBack: {
    type: String,
    default: "No guarntee",
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
  rating: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  trending: {
    type: Boolean,
    default: false,
  },
});

const book = mongoose.model("book", BookSchema);

module.exports = book;
