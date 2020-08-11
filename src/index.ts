import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";

import multer from "multer";

import user from "./routes/user";
import {router as frontRecipes} from "./routes/recipes";
import {router as auth } from "./routes/auth";
import { mongoConnect } from "./util/database"

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req: any, file: any, callback: any) => {
    callback(null, "images/recipes");
  },
  filename: (req: any, file: { originalname: any; }, callback: any) => {
    callback(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const fileFilter = (req: any, file: { mimetype: string; }, callback: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  "/images/recipes",
  express.static(path.join(__dirname, "../images/recipes"))
);
app.use(multer({ storage: fileStorage, fileFilter }).single("mainImg"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(frontRecipes);
app.use(auth);
app.use(user);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "404!! Page not found"
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  const httpStatusError = error.statusCode || 500;
  res.status(httpStatusError).json({
    ...error
  });
});

mongoConnect(
  "mongodb+srv://admin:eCArdozwlqyCv3F6@cluster0-7imhl.mongodb.net/what-can-i-cook?retryWrites=true&w=majority",
  () => {
    app.listen(5000);
  }
);
