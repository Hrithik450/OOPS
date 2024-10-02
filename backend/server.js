require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const path = require("path");

// uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Server error ${err.message}`);
  console.log("Shutting down the server due to uncaught error");

  server.close(() => {
    process.exit(1);
  });
});

//routes
const PostRouter = require("./routes/user");
const AuthRouter = require("./routes/oauth");
const VerifyRouter = require("./routes/verifyEmail");
const ProductRouter = require("./routes/product");
const PaymentRouter = require("./routes/payment");
const AdminRouter = require("./routes/admin");
const ErrorMiddleware = require("./middlewares/ErrorHandling");

const app = express();
const PORT = process.env.PORT || 7000;
connectDB("mongodb://127.0.0.1:27017/backend ");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
require("./utils/oauth");

app.use(passport.initialize());

app.use("/", PostRouter);
app.use("/auth", AuthRouter);
app.use("/verify", VerifyRouter);
app.use("/product", ProductRouter);
app.use("/checkout", PaymentRouter);
app.use("/admin", AdminRouter);
app.use(ErrorMiddleware);

const server = app.listen(PORT, () => console.log(`server started at ${PORT}`));

// Unhandled Promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Server error ${err.message}`);
  console.log("Server is on maintainance");

  server.close(() => {
    process.exit(1);
  });
});
