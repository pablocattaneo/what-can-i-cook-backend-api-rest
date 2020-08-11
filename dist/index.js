"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const user_1 = __importDefault(require("./routes/user"));
const recipes_1 = require("./routes/recipes");
const auth_1 = require("./routes/auth");
const database_1 = require("./util/database");
const app = express_1.default();
const fileStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/recipes");
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString()}-${file.originalname}`);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
app.use(body_parser_1.default.json());
app.use("/images/recipes", express_1.default.static(path_1.default.join(__dirname, "../images/recipes")));
app.use(multer_1.default({ storage: fileStorage, fileFilter }).single("mainImg"));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(recipes_1.router);
app.use(auth_1.router);
app.use(user_1.default);
app.use((req, res) => {
    res.status(404).json({
        error: "404!! Page not found"
    });
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    // eslint-disable-next-line no-console
    const httpStatusError = error.statusCode || 500;
    res.status(httpStatusError).json({
        ...error
    });
});
database_1.mongoConnect("mongodb+srv://admin:eCArdozwlqyCv3F6@cluster0-7imhl.mongodb.net/what-can-i-cook?retryWrites=true&w=majority", () => {
    app.listen(5000);
});
