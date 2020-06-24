const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/user/:userId", userController.getUserById);

module.exports = router;
