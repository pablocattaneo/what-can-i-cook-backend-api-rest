const express = require('express');

const router = express.Router();

const getDb = require('../util/database').getDb;
const mongoConnect = require('../util/database').mongoConnect;

function getProducts() {
  const db = getDb().db();
  db.collection('products')
    .find()
    .toArray()
    .then(r=>{
      console.log("products", r);
    });
}

router.get('/products/:productId',(req, res, next) => {
  res.send(`<h1>Hello products ${ req.params.productId } !!</h1>`);
})
router.get('/products/',(req, res, next) => {
  getProducts();
  res.send(`<h1>Hello products Home !!</h1>`);
})

module.exports = router;