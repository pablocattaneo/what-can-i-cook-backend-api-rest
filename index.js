const express = require("express");
const bodyParser = require("body-parser");

const home = require("./routes/home");
const adminRoutes = require("./routes/admin");
const adminshop = require("./routes/shop");
const adminsProducts = require("./routes/products");
const frontRecipes = require("./routes/recipes");
const { mongoConnect } = require("./util/database");

const app = express();

app.use(bodyParser.json());

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
app.use(home);

app.use((req, res) => {
  res.status(404).send("<h1>404!! Page not found</h1>");
});

mongoConnect("mongodb://127.0.0.1:27017/what-can-i-cook", () => {
  app.listen(5000);
});
