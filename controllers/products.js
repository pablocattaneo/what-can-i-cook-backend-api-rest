const { getDb } = require("../util/database");

function getProducts() {
  const db = getDb().db();
  return db
    .collection("products")
    .find()
    .toArray()
    .then(response => {
      return response;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log("error", error);
    });
}

exports.getProductById = (req, res) => {
  res.send(`<h1>Hello products ${req.params.productId} !!</h1>`);
};

exports.getAllProducts = (req, res) => {
  getProducts().then(response => {
    res.status(200).json(response);
  });
};

exports.createProduct = (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: "Product was created successfully!",
    data: body
  });
};
