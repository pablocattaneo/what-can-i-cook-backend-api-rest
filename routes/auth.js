/* eslint-disable promise/no-return-wrap */
const express = require("express");
const { body } = require("express-validator");
const { getDb } = require("../util/database");

const router = express.Router();

const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom(emailValue => {
        const db = getDb().db();
        // eslint-disable-next-line promise/catch-or-return
        return db
          .collection("users")
          .findOne({ email: emailValue })
          .then(userDoc => {
            // eslint-disable-next-line promise/always-return
            if (userDoc) {
              return Promise.reject(new Error("Email addres already exist"));
            }
          });
      }),
    body("password")
      .trim()
      .not()
      .isEmpty(),
    body("userName")
      .trim()
      .not()
      .isEmpty(),
    body("name")
      .trim()
      .not()
      .isEmpty(),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

module.exports = router;
