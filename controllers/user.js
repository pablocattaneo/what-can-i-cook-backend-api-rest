const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const database = getDb().db();
    const db = await database;
    const usersCollection = await db.collection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
};
