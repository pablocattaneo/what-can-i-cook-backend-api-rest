const express = require("express");

const router = express.Router();

const productsController = require("../controllers/products");

router.post("/products/create-product", productsController.createProduct);
router.get("/products/:productId", productsController.getProductById);
router.get("/products/", productsController.getAllProducts);

module.exports = router;
