const express = require("express");
const { AdminDashboard } = require("../controllers/Dashboard");
const { verifyToken } = require("../middlewares/userAuth");
const { Admin } = require("../middlewares/admin");
const {
  GetAllUsers,
  GetSingleUser,
  DeleteUser,
} = require("../controllers/Dashboard");
const {
  CreateProduct,
  UpdateProduct,
  DeleteBook,
  CreateBook,
  UpdateBook,
} = require("../controllers/Dashboard");

const router = express.Router();

router.get("/dashboard", verifyToken, Admin(["ADMIN"]), AdminDashboard);
router.post("/createBook", verifyToken, Admin(["ADMIN"]), CreateBook);
router.post("/createProduct", verifyToken, Admin(["ADMIN"]), CreateProduct);
router.post("/updateBook", verifyToken, Admin(["ADMIN"]), UpdateBook);
router.post("/updateproduct/:id", verifyToken, Admin(["ADMIN"]), UpdateProduct);
router.post("/deleteBook", verifyToken, Admin(["ADMIN"]), DeleteBook);
router.get("/getAllUsers", verifyToken, Admin(["ADMIN"]), GetAllUsers);
router.get("/getSingleUser", verifyToken, Admin(["ADMIN"]), GetSingleUser);
router.post("/DeleteUser", verifyToken, Admin(["ADMIN"]), DeleteUser);

module.exports = router;
