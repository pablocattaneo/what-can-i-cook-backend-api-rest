import { Request, Response } from 'express';

import { ObjectId } from 'mongodb';
import { getDb } from '../util/database';

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;
  try {
    const db = getDb().db();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } },
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateUserById(req: Request, res: Response): Promise<void> {
  const { contentToUpdate, userId } = req.body;
  try {
    const db = getDb().db();
    const usersCollection = db.collection('users');
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: contentToUpdate,
      },
    );
    req.params = { userId }
    getUserById(req, res);
  } catch (error) {
    throw new Error(error);
  }
}
