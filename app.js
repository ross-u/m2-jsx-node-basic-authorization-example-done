const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const erv = require("express-react-views");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");

const DB_NAME = "basic-auth";
const app = express();

// DB CONNECTION
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// VIEW ENGINE SETUP
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", erv.createEngine());

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/auth", authRouter);

app.get("/", (req, res, next) => {
  res.render("Home");
});

module.exports = app;
