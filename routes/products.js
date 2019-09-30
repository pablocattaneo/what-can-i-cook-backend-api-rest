const express = require('express');

const router = express.Router();

router.get('/products/:productId',(req, res, next) => {
  res.send(`<h1>Hello products ${ req.params.productId } !!</h1>`);
})

module.exports = router;