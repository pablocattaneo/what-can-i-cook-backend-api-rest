const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw new Error("Not authenticated.");
  }
  const token = authHeader.split(" ")[1];
  const decodeToken = jwt.verify(token, "somesupersecretsecret");
  if (!decodeToken) {
    throw new Error("Not authenticated");
  }
  req.userId = decodeToken.userId;
  next();
};
