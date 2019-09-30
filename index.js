const express = require('express');

const adminRoutes = require('./routes/admin');
const adminshop = require('./routes/shop');
const adminsProducts = require('./routes/products');
const mongoConnect = require('./util/database');

const app = express();

app.use(adminRoutes);
app.use(adminshop);
app.use(adminsProducts);

app.use((req, res, next) => {
  res.status(404).send('<h1>404!! Page not found</h1>');
})

app.listen(5000)

mongoConnect('mongodb://localhost:27017', 'what-can-i-cook')