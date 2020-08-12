import { Request, Response, NextFunction } from 'express';

const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

export async function getUserById(req: Request | any, res: Response | any) {
  const { userId } = req.params;
  try {
    const dbConnection = getDb().db();
    const db = await dbConnection;
    const usersCollection = await db.collection('users');
    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } },
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateUserById(req: Request, res: Response) {
  const { contentToUpdate, userId } = req.body;
  try {
    const dbConnection = getDb().db();
    const db = await dbConnection;
    const usersCollection = await db.collection('users');
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: contentToUpdate,
      },
    );
    const fakeReq = { params: { userId } };
    getUserById(fakeReq, res);
  } catch (error) {
    throw new Error(error);
  }
}
