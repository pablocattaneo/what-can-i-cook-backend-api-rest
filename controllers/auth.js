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
      "P2bQM9L2r4b$}3<X)_cU_+F7-:}'Y-]e(gPH::?^*YW,x5<3*Zrfy=zZ^.K!aJ,6!S&UJ;fTCmnz}.>\,^mtK8d{jw8a88z`yARW@b78K8+TxNg6{Eg?wPXZ3%:fjZY3;V[dX#Y7t\K9]sXXXud+mFjqtM#[q\(UL#.c-L@M99wfJ2RsaSj\Q7x/Gwnmnk+c6-Jb.n-&:J'jzS:fGDa*e6aw;W(u$!R6~cbed}tWw7.[g]yTzx@56Hhz}2{L`6%;",
      { expiresIn: "1hr" }
    );
    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({ token, userId: loadedUser._id.toString() });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
