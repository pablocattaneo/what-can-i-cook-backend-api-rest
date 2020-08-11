"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable promise/no-return-wrap */
const express_1 = __importDefault(require("express"));
// const { body } = require("express-validator");
const express_validator_1 = require("express-validator");
const database_1 = require("../util/database");
const router = express_1.default.Router();
exports.router = router;
const authController = require("../controllers/auth");
router.put("/signup", [
    express_validator_1.body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail()
        .custom(emailValue => {
        const db = database_1.getDb().db();
        // eslint-disable-next-line promise/catch-or-return
        return (db
            .collection("users")
            .findOne({ email: emailValue })
            // eslint-disable-next-line consistent-return
            .then((userDoc) => {
            // eslint-disable-next-line promise/always-return
            if (userDoc) {
                return Promise.reject(new Error(`Email addres ${userDoc.email} already exist in our registry.`));
            }
        }));
    }),
    express_validator_1.body("password")
        .trim()
        .not()
        .isEmpty(),
    express_validator_1.body("confirmPassword")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password and confirm password fields have to match");
        }
        return true;
    })
        .trim()
        .not()
        .isEmpty(),
    express_validator_1.body("userName")
        .trim()
        .not()
        .isEmpty(),
    express_validator_1.body("name")
        .trim()
        .not()
        .isEmpty(),
    express_validator_1.body("lastName")
        .trim()
        .not()
        .isEmpty()
], authController.signup);
router.post("/login", [
    express_validator_1.body("email")
        .trim()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("Please enter a valid email.")
        .normalizeEmail(),
    express_validator_1.body("password")
        .trim()
        .not()
        .isEmpty()
], authController.login);
