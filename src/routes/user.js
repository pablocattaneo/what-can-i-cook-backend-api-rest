const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const IsAuth = require("../middleware/is-auth");

router.get("/user/:userId", IsAuth, userController.getUserById);

router.post("/user/update/:userId", IsAuth, userController.updateUserById);

module.exports = router;
