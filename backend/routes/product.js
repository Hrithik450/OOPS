const express = require("express");
const {
  Getproducts,
  GetSingleProduct,
  updateRating,
  DownloadPdf,
  Pdfpath,
  feature,
} = require("../controllers/products");

const router = express.Router();

router.get("/getproducts", Getproducts);
router.get("/:id", GetSingleProduct);
router.post("/review/:prdtId", updateRating);
router.get("/api/featureproducts", feature);
router.get("/download/:productId", DownloadPdf);
router.get("/api/get-pdf", Pdfpath);

module.exports = router;
