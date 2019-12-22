const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDb } = require("../util/database");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: "Validation failed",
      errors: errors.array()
    });
    throw new Error("Validation failed Error");
  }
  const { userName } = req.body;
  const { password } = req.body;
  const { name } = req.body;
  const { lastName } = req.body;
  const { email } = req.body;
  bcrypt
    .hash(password, 12)
    .then(passwordEnc => {
      (async () => {
        const user = {
          userName,
          password: passwordEnc,
          name,
          lastName,
          email
        };
        const db = getDb().db();
        const insertOneWriteOpResultObject = await db
          .collection("users")
          .insertOne(user);
        const insertedResult = insertOneWriteOpResultObject.ops[0];
        res.status(200).json({
          insertedResult
        });
        return insertedResult;
      })();
      return true;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log("error", error);
    });
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const db = getDb().db();
    const user = await db.collection("users").findOne({ email });
    if (user === null) {
      const error = new Error("Email doesn't exist.");
      error.status = 401;
      throw error;
    }
    const loadedUser = user;
    console.log("user", user);
    const userPasswordAndStorePasswordAreIqual = await bcrypt.compare(
      password,
      user.password
    );
    if (!userPasswordAndStorePasswordAreIqual) {
      const error = new Error("Password is wrong");
      error.status = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        // eslint-disable-next-line no-underscore-dangle
        userId: loadedUser._id.toString()
      },
      "somesupersecretsecret",
      { expiresIn: "1hr" }
    );
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
