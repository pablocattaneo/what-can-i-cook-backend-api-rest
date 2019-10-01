const MongoClient = require('mongodb').MongoClient;

let _db;

function mongoConnect(url, dbName, callback) {
  MongoClient.connect(url)
  .then(client => {
    console.log("Connected successfully to on mongo server");
    _db = client.db(dbName);
    callback();
  })
  .catch(error => {
    console.log("error", error);
    throw error
  });
};

function getDb() {
  if (_db) {
    return _db;
  }
  throw "No database found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

