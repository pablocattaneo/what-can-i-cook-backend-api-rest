import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import helmet from 'helmet'
import multer, { FileFilterCallback } from 'multer';

import user from './routes/user';
import frontRecipes from './routes/recipes';
import  auth from './routes/auth';
import { mongoConnect } from './util/database';

import { wcError } from './custom-types'

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/recipes');
  },
  filename: (req, file, callback) => {
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (
    file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/webp'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(helmet());
app.use(bodyParser.json());
app.use(
  '/images/recipes',
  express.static(path.join(__dirname, '../images/recipes')),
);
app.use(multer({ storage: fileStorage, fileFilter }).single('mainImg'));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(frontRecipes);
app.use(auth);
app.use(user);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: '404!! Page not found',
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: wcError, req: Request, res: Response, next: NextFunction) => {
  const httpStatusError = error.statusCode || 500;
  res.status(httpStatusError).json({
    ...error,
  });
});

(async () => {
  await mongoConnect(
    'mongodb+srv://admin:eCArdozwlqyCv3F6@cluster0-7imhl.mongodb.net/what-can-i-cook?retryWrites=true&w=majority'
  );
  app.listen(process.env.PORT || 5000);
})()
