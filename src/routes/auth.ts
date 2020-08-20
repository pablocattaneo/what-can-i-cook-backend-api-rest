import express from 'express';
import { body } from 'express-validator';
import { getDb } from '../util/database';

const router = express.Router();

import { signup, login } from '../controllers/auth';

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail()
      .custom(async (emailValue) => {
        const db = getDb().db();
        const userDoc: { email: string; } | null = await db.collection('users').findOne({ email: emailValue })
        if (userDoc !== null) {
          return Promise.reject(
            new Error(
              `Email addres ${
                userDoc.email
              } already exist in our registry.`,
            ),
          );
        }
      }),
    body('password')
      .trim()
      .not()
      .isEmpty(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password and confirm password fields have to match');
        }
        return true;
      })
      .trim()
      .not()
      .isEmpty(),
    body('userName')
      .trim()
      .not()
      .isEmpty(),
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('lastName')
      .trim()
      .not()
      .isEmpty(),
  ],
  signup,
);

router.post(
  '/login',
  [
    body('email')
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .not()
      .isEmpty(),
  ],
  login,
);

export default router;
