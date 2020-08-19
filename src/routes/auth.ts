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
      .custom((emailValue) => {
        const db = getDb().db();
        return (
          db
            .collection('users')
            .findOne({ email: emailValue })
            // eslint-disable-next-line consistent-return
            .then((userDoc: { email: any; }) => {
              if (userDoc) {
                return Promise.reject(
                  new Error(
                    `Email addres ${
                      userDoc.email
                    } already exist in our registry.`,
                  ),
                );
              }
            })
        );
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
