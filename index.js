const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const multer = require("multer");
const home = require("./routes/home");
const user = require("./routes/user");
const adminRoutes = require("./routes/admin");
const adminshop = require("./routes/shop");
const adminsProducts = require("./routes/products");
const frontRecipes = require("./routes/recipes");
const auth = require("./routes/auth");
const { mongoConnect } = require("./util/database");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/recipes");
  },
  filename: (req, file, callback) => {
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  "/images/recipes",
  express.static(path.join(__dirname, "images/recipes"))
);
app.use(multer({ storage: fileStorage, fileFilter }).single("mainImage"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(adminRoutes);
app.use(adminshop);
app.use(adminsProducts);
app.use(frontRecipes);
app.use(auth);
app.use(home);
app.use(user);

app.use((req, res) => {
  res.status(404).json({
    error: "404!! Page not found"
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // eslint-disable-next-line no-console
  const httpStatusError = error.statusCode || 500;
  console.log("error catch all", error);
  console.log("error.statusCode", error.statusCode);
  console.log("error.customErrorMessage", error.customErrorMessage);
  res.status(httpStatusError).json({
    ...error
  });
});

mongoConnect("mongodb://127.0.0.1:27017/what-can-i-cook", () => {
  app.listen(5000);
});
