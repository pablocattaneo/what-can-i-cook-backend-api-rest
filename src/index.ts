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
  destination: (req: any, file: any, callback: (arg0: null, arg1: string) => void) => {
    callback(null, "images/recipes");
  },
  filename: (req: any, file: { originalname: any; }, callback: (arg0: null, arg1: string) => void) => {
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const fileFilter = (req: any, file: { mimetype: string; }, callback: (arg0: null, arg1: boolean) => void) => {
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
app.use(multer({ storage: fileStorage, fileFilter }).single("mainImg"));

app.use((req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
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

app.use((req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  res.status(404).json({
    error: "404!! Page not found"
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error: { statusCode: number; customErrorMessage: any; }, req: any, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }, next: any) => {
  // eslint-disable-next-line no-console
  const httpStatusError = error.statusCode || 500;
  console.log("error catch all", error);
  console.log("error.statusCode", error.statusCode);
  console.log("error.customErrorMessage", error.customErrorMessage);
  res.status(httpStatusError).json({
    ...error
  });
});

mongoConnect(
  "mongodb+srv://admin:eCArdozwlqyCv3F6@cluster0-7imhl.mongodb.net/what-can-i-cook?retryWrites=true&w=majority",
  () => {
    app.listen(5000);
  }
);
