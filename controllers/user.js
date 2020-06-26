const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const dbConnection = getDb().db();
    const db = await dbConnection;
    const usersCollection = await db.collection("users");
    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
    console.log("user", user);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
};
