const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const db = getDb().db();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
};
