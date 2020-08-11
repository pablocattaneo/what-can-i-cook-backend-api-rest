"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoClient = require("mongodb").MongoClient;
const mongodb_1 = __importDefault(require("mongodb"));
const mongoClient = mongodb_1.default.MongoClient;
let db;
function mongoConnect(uri, callback) {
    mongoClient
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(mongoClientIntance => {
        // eslint-disable-next-line no-console
        console.log("Connected successfully to on mongo server");
        db = mongoClientIntance;
        // eslint-disable-next-line promise/no-callback-in-promise
        callback();
        return "promise fulfilled";
    })
        .catch(error => {
        // eslint-disable-next-line no-console
        console.log("error", error);
        throw error;
    });
}
exports.mongoConnect = mongoConnect;
function getDb() {
    if (db) {
        return db;
    }
    throw new Error("No database found");
}
exports.getDb = getDb;
