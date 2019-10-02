const mongoClient = require('mongodb').MongoClient;

let _db;

function mongoConnect(url, callback) {
  mongoClient.connect(url)
  .then(mongoClientIntance => {
    console.log("Connected successfully to on mongo server");
    _db = mongoClientIntance;
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

