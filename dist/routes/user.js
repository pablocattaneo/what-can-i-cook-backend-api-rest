"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_1 = require("../controllers/user");
const is_auth_1 = require("../middleware/is-auth");
router.get("/user/:userId", is_auth_1.IsAuth, user_1.getUserById);
router.post("/user/update/:userId", is_auth_1.IsAuth, user_1.updateUserById);
exports.default = router;
