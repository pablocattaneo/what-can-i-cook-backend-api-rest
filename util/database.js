const mongoClient = require("mongodb").MongoClient;

let db;

function mongoConnect(uri, callback) {
  mongoClient
    .connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
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

function getDb() {
  if (db) {
    return db;
  }
  throw new Error("No database found");
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
