"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
async function getUserById(req, res) {
    const { userId } = req.params;
    try {
        const dbConnection = getDb().db();
        const db = await dbConnection;
        const usersCollection = await db.collection("users");
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } });
        res.json(user);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.getUserById = getUserById;
;
async function updateUserById(req, res) {
    const { contentToUpdate, userId } = req.body;
    try {
        const dbConnection = getDb().db();
        const db = await dbConnection;
        const usersCollection = await db.collection("users");
        await usersCollection.updateOne({ _id: new ObjectId(userId) }, {
            $set: contentToUpdate
        });
        const fakeReq = { params: { userId } };
        getUserById(fakeReq, res);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.updateUserById = updateUserById;
;
