const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const IsAuth = require("../middleware/is-auth");

router.get("/user/:userId", IsAuth, userController.getUserById);

module.exports = router;
