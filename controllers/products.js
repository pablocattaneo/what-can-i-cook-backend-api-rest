const { getDb } = require('../util/database');

function getProducts() {
  const db = getDb().db();
  db.collection('products')
    .find()
    .toArray()
    .then((r) => {
      console.log('products', r);
    });
}

exports.getProductById = (req, res) => {
  res.send(`<h1>Hello products ${req.params.productId} !!</h1>`);
};

exports.getAllProducts = (req, res) => {
  getProducts();
  res.status(200).json({ greet: 'Hello !!' });
};

exports.createProduct = (req, res) => {
  const { body } = req;
  console.log('body', body);
  res.status(201).json({
    message: 'Product was created successfully!',
    data: body,
  });
};
