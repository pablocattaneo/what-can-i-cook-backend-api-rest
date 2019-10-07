const getDb = require('../util/database').getDb;

function getProducts() {
  const db = getDb().db();
  db.collection('products')
    .find()
    .toArray()
    .then(r=>{
      console.log("products", r);
    });
}

exports.getProductById = (req, res, next) => {
  res.send(`<h1>Hello products ${ req.params.productId } !!</h1>`);
}

exports.getAllProducts = (req, res, next) => {
  getProducts();
  res.send(`<h1>Hello products Home !!</h1>`);
}