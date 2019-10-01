const express = require('express');

const adminRoutes = require('./routes/admin');
const adminshop = require('./routes/shop');
const adminsProducts = require('./routes/products');
const mongoConnect = require('./util/database').mongoConnect;
const getDb = require('./util/database').getDb;

const app = express();

app.use(adminRoutes);
app.use(adminshop);
app.use(adminsProducts);

app.use((req, res, next) => {
  res.status(404).send('<h1>404!! Page not found</h1>');
})

function hello() {
  const db = getDb();
  db.collection('products')
    .find()
    .toArray()
    .then(r=>{
      console.log("products", r);
    });
}

mongoConnect('mongodb://127.0.0.1:27017', 'what-can-i-cook', hello);

app.listen(5000)