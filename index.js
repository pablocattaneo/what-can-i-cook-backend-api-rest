const express = require('express');

const adminRoutes = require('./routes/admin');
const adminshop = require('./routes/shop');
const adminsProducts = require('./routes/products');
const home = require('./routes/home');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.use(adminRoutes);
app.use(adminshop);
app.use(adminsProducts);
app.use(home);

app.use((req, res, next) => {
  res.status(404).send('<h1>404!! Page not found</h1>');
})

mongoConnect('mongodb://127.0.0.1:27017/what-can-i-cook', () => { app.listen(5000) });