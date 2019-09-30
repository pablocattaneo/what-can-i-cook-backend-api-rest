const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function mongoConnect(url, dbName) {
  MongoClient.connect(url)
  .then(client => {
    console.log("Connected successfully to on mongo server");
    const db = client.db(dbName);
    db.collection('products')
      .find()
      .toArray()
      .then(r=>{
        console.log("products", r);
      });
  })
  .catch(e => {
    console.log("error", e);
  });
}

module.exports = mongoConnect;

