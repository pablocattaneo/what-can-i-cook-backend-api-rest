const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
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
